# Fast & Efficient LLM Inference with vLLM
### A Complete Guide for New Researchers

> **Course:** Fast & Efficient LLM Inference — built in partnership with Red Hat  
> **Instructor:** Cedric Clyburn, Senior Developer Advocate at Red Hat  
> **Platform:** DeepLearning.AI

---

## Table of Contents

1. [Introduction & Course Overview](#1-introduction--course-overview)
2. [Why Efficient LLM Deployment Matters](#2-why-efficient-llm-deployment-matters)
3. [Inference and Memory Fundamentals](#3-inference-and-memory-fundamentals)
4. [LLM Optimization Fundamentals](#4-llm-optimization-fundamentals)
5. [Optimizing a Model with LLM Compressor](#5-optimizing-a-model-with-llm-compressor)
6. [Serving LLMs Efficiently with vLLM — Part I (Core Concepts)](#6-serving-llms-efficiently-with-vllm--part-i-core-concepts)
7. [Serving LLMs Efficiently with vLLM — Part II (Hands-On)](#7-serving-llms-efficiently-with-vllm--part-ii-hands-on)
8. [Measuring What Matters: Benchmarking and Evaluation](#8-measuring-what-matters-benchmarking-and-evaluation)
9. [Putting It All Together: Final Recap & Next Steps](#9-putting-it-all-together-final-recap--next-steps)

---

## 1. Introduction & Course Overview

### What This Course Is About

Open-source LLMs have exploded in availability, but deploying them efficiently — at low latency and reasonable cost — remains a significant engineering challenge. This course teaches you a **complete, production-ready workflow**:

```
Quantize Model  →  Serve with vLLM  →  Benchmark Performance  →  Evaluate Quality
```

### The Two Core Memory Components in LLM Inference

When an LLM generates a response, it relies on two things stored in GPU memory:

| Component | Description | Behavior |
|-----------|-------------|----------|
| **Model Weights** | The billions of learned parameters (e.g., Llama, Qwen) | Loaded once at startup; fixed regardless of how many requests you serve |
| **KV Cache** | Keys and values representing context from previous tokens | Dynamic; every request has its own, and it grows with every new token generated |

### Memory Reality Check: Llama 3 70B

```
Model weights:        ~140 GB  (requires ≥ 2 × 80 GB GPUs just to load)
Standard production:   4 × 80 GB GPUs = 320 GB total
Remaining for KV cache: ~180 GB

One 8k-token request KV cache:   ~2.5 GB
One 32k-token request KV cache:  ~10 GB
→ You can serve ~18 long-context users in parallel (but naive setups drop this to 2–3!)
```

### Key Techniques You Will Learn

- **Quantization** — shrinks model weights by storing them at lower numerical precision
- **PagedAttention** — splits the KV cache into small, fixed-size blocks to eliminate memory waste
- **Continuous Batching** — keeps the GPU busy by filling slots the moment a request finishes
- **Prefix Caching** — reuses computed KV cache when multiple requests share the same prefix
- **GuideLLM** — benchmarks your deployment under realistic load
- **LM-Eval** — evaluates model quality on standardized benchmarks

---

## 2. Why Efficient LLM Deployment Matters

### The Shift in the AI Challenge

```
Early 2023:  "Can I get a good open-source model?"
Now:         "Can I run that model efficiently?"
```

Hugging Face hosts thousands (even millions) of models from nearly every major organization. The bottleneck is no longer *finding* a model — it's *running* one efficiently.

### Why Run Models Yourself Instead of Calling an API?

| Reason | Explanation |
|--------|-------------|
| **Cost Savings** | Pay for hardware, not per-token; match model size to task difficulty |
| **Security** | Data never leaves your environment — critical for healthcare and financial services |
| **Control** | No rate limits, no third-party downtime, upgrade on your schedule |
| **Customization** | Fine-tune for accuracy and cost control |

### Service Level Objectives (SLOs)

Every production deployment needs measurable targets. SLOs cover two dimensions:

#### 1. Accuracy
A model that hallucinates or gives off-brand answers isn't useful. Use **model cards** to compare optimized models against baselines before deploying.

*Example: Llama 3.1's model card shows an optimized smaller version retaining 99.88% accuracy on average across MMLU, GSM8K, and similar benchmarks.*

#### 2. Inference Performance — The 4 Key Metrics

```
Time to First Token (TTFT)
└── How long the user waits before seeing any output

Inter-Token Latency (ITL)
└── Average time between consecutive generated tokens (excludes first token)
    Measures smoothness and speed of streaming

Request Latency
└── Total end-to-end time for the full response

Throughput
└── Average output tokens per second across ALL concurrent requests
    Answers: "Can my system handle production-scale traffic?"
```

### The Production Cost Without Optimization

| Setup | Monthly Cost |
|-------|--------------|
| Naive deployment (full precision, one request at a time) | Hundreds of thousands to millions of dollars |
| + Continuous Batching + PagedAttention (vLLM) | ~10× reduction |
| + Model Quantization on top | Even further reduction |

---

## 3. Inference and Memory Fundamentals

### The Three-Layer Inference Stack

```
┌─────────────────────────────┐
│         The Model           │  ← Learned parameters (Llama, Qwen, etc.)
├─────────────────────────────┤
│      Inference Server       │  ← vLLM: loads the model, manages requests,
│                             │    applies all optimizations
├─────────────────────────────┤
│    Hardware Accelerator     │  ← GPU: does the heavy numerical lifting
└─────────────────────────────┘
```

> **Key insight:** You *can* run a model directly on a GPU with PyTorch (fine for a notebook), but the moment you need to serve many users simultaneously, the inference server becomes essential.

### How LLMs Generate Text: Autoregressive Generation

LLMs don't produce a whole sentence at once. They generate **one token at a time**:

```
Input:  "The quick brown"
Step 1: Model predicts → "fox"    → Input becomes "The quick brown fox"
Step 2: Model predicts → "jumps"  → Input becomes "The quick brown fox jumps"
Step 3: Model predicts → "over"   → ...continues until <end-of-sequence> token
```

Every token requires a **full forward pass** through the entire model.  
A 500-token answer = the model runs **500 times**.

### Inside a Forward Pass: The Transformer Architecture

```
Input Tokens
     ↓
[Embedding Layer]   ← Converts tokens to vectors of numbers
     ↓
[Transformer Layer 1]
  ├── Self-Attention Block  (4 linear layers: Q, K, V, O projections)
  └── Feed-Forward Network  (3 linear layers: gate, up, down)
     ↓
[Transformer Layer 2]
  ...
     ↓
[Transformer Layer N]
     ↓
[LM Head]           ← Converts final representation to token probabilities
     ↓
Next Token (e.g., "fox" with 90% probability)
```

Every linear layer is simply a **matrix multiplication**: input vector × weight matrix = output vector. This is where almost all computation and parameters live.

### Self-Attention Deep Dive

When processing the token "fox" in "The quick brown fox", the model computes three vectors:

```
Q (Query)  = "What information do I need from the context?"
K (Key)    = "What kind of information does each token contain?"
V (Value)  = "What is the actual content if my key is relevant?"
```

The attention computation:
1. Compute dot product of Q₄ with every K (all previous tokens)
2. Divide by √(key dimension) to stabilize numbers
3. Apply softmax → weights that sum to 1
4. Take weighted sum of all V vectors
5. Pass through O projection → final attention output

### The KV Cache: Why It Exists

**The key observation:** To generate token #5, you need K and V of tokens 1–4. But those haven't changed! Recomputing them every step would be wasteful.

```
Step 1: Generate token 4 ("fox")   → Compute K4, V4 → SAVE to cache
Step 2: Generate token 5 ("jumps") → Only compute K5, V5 (new)
                                     Retrieve K1–K4, V1–V4 from CACHE ✓
Step 3: Continue...
```

This is the **KV Cache** — keys and values stored in GPU memory for every token in the current context. It saves happening at every transformer layer, so the savings multiply by N layers.

### KV Cache Size Calculation (Llama 3 70B Example)

```
Formula: 2 × num_layers × num_KV_heads × head_dimension × bytes_per_element

Llama 3 70B:
  2 × 80 × 8 × 128 × 2 bytes = ~320 KB per token

At different context lengths:
  2,000  tokens (typical chat turn)    →  ~640 MB
  8,000  tokens (standard production)  →  ~2.5 GB
  32,000 tokens (long document)        →  ~10 GB
  128,000 tokens (Llama 3's max)       →  ~40 GB  ← Nearly 1/3 of model size, per user!
```

**Serving 10 concurrent long-context users = 400+ GB of KV cache alone.**  
This is why the KV cache is the dominant memory concern in production LLM inference.

### GPU Memory Hierarchy

```
┌──────────────────────────────────────────────────────┐
│  SRAM (On-chip, ~20 MB, ~19 TB/s bandwidth)          │  ← Tensor Cores read from here
│  The fastest; tiny; used for active computation       │
├──────────────────────────────────────────────────────┤
│  HBM / VRAM (GPU card, 40–80+ GB, ~1.5 TB/s)        │  ← Model weights + KV Cache live here
│  Fast; moderate size; the main GPU memory you buy    │
├──────────────────────────────────────────────────────┤
│  CPU DRAM (Host machine, 16 GB – 1 TB+, ~12 GB/s)   │  ← Very slow relative to GPU
│  Slow; large; far from the GPU                       │
└──────────────────────────────────────────────────────┘
```

**Two things govern inference speed:**
1. How fast data moves from HBM → SRAM
2. How fast the Tensor Cores compute once data arrives

Every optimization in this course comes back to: *move less data, move it more efficiently, manage memory better.*

---

## 4. LLM Optimization Fundamentals

### The Growing Model-Hardware Gap

Model sizes have roughly **doubled every year** since the original Transformer in 2017 (50M parameters) through today's frontier models (hundreds of billions to trillions). GPU memory has barely kept pace. This creates four real problems:

1. **Infrastructure cost** — more GPUs, often across multiple nodes
2. **User experience** — slower responses, lower throughput, limited context length
3. **Energy & carbon footprint** — every extra GPU draws power at scale
4. **Model obsolescence risk** — investing in infrastructure for a quickly superseded model

### The Two Categories of Optimization

```
Model Optimizations                    Inference Optimizations
───────────────────────────────        ────────────────────────────────────
Applied to the model BEFORE deploy     Happen at runtime IN the serving engine
Techniques: Quantization, Sparsity     Techniques: Continuous Batching,
Goal: Reduce memory footprint &                    PagedAttention,
      computational requirements                   Prefix Caching
      while preserving accuracy        Goal: Maximize throughput & minimize latency
```

### Quantization: The Core Compression Technique

**The idea:** Instead of storing model weights at full precision (e.g., 3.14159265...), store them at lower precision (e.g., 3.14).

#### Numerical Formats Explained

| Format | Bits | Description |
|--------|------|-------------|
| **FP32** | 32 bits | Full precision floating point; huge range, very precise |
| **BF16** | 16 bits | Brain Float 16 (Google); same range as FP32, less precision; standard for LLM release |
| **FP16** | 16 bits | Floating Point 16; smaller range than BF16 |
| **FP8** | 8 bits | 8-bit floating point; supported on Hopper (H100) GPUs |
| **INT8** | 8 bits | 8-bit integer; whole numbers like -127 to 127 |
| **INT4** | 4 bits | 4-bit integer; most aggressive, highest compression |

Moving down this list = trading **precision for size**.

#### What Gets Quantized?

Quantization targets the **linear layers** inside each Transformer block:

```
Self-Attention Block:      Q, K, V, O projections (4 linear layers)
Feed-Forward Network:      gate, up, down projections (3 linear layers)

NOT quantized (excluded to preserve accuracy):
  - Embedding layer (input)
  - LM Head (output)
  - Layer normalization layers
```

Two things can be quantized inside each linear layer:
- **Weights** — the model's learned parameters
- **Activations** — the intermediate tensors that flow through the layers at runtime

#### Two Quantization Schemes

**Weight-Only Quantization (e.g., W8A16 — 8-bit weights, 16-bit activations)**

```
Training:   Weights stored in BF16
Deployment: Weights stored in INT8 (smaller)
At runtime: Weights loaded from HBM → SRAM in INT8 (less data to move!)
            Dequantized back to BF16 just before multiplication
            Math happens in full precision

Benefit: Faster data movement (half the data to transfer)
Tradeoff: No Tensor Core speedup (math still at full precision)
```

**Weight + Activation Quantization (e.g., W8A8 — both 8-bit)**

```
Training:   Both at BF16
Deployment: Both at INT8 or FP8
At runtime: Less data moves HBM → SRAM (faster)
            Math runs on dedicated FP8/INT8 Tensor Cores (more ops/sec)

Benefit: BOTH data movement AND compute speedups
Requirement: Newer GPUs (Hopper for FP8, older Ampere for INT8)
```

#### Quantization Impact: Llama 4 Scout (109B Parameters) Example

```
BF16 baseline:  109B × 2 bytes = ~220 GB  → needs 3× 80GB GPUs
FP8/INT8:       109B × 1 byte  = ~109 GB  → needs 2× 80GB GPUs  (50% reduction)
INT4/FP4:       109B × 0.5 byte= ~55 GB   → needs 1× 80GB GPU   (75% reduction!)
```

#### Real-World Performance Gains (FP16 vs FP8, Llama 3 70B on 2× H100s)

| Metric | FP16 Baseline | FP8 Quantized | Improvement |
|--------|--------------|---------------|-------------|
| **Throughput** | ~158 tokens/sec | ~474 tokens/sec | **3× faster** |
| **Time to First Token at high load** | >30,000 ms | ~4,800 ms | **67× faster** |

#### Does Quantization Hurt Accuracy?

**Done correctly: essentially no.** But the method matters.

- **Naive quantization** (just rounding every number) → noticeable accuracy loss at INT4
- **Calibrated techniques** (AWQ, GPTQ, SmoothQuant) → use a small representative dataset to identify which weights matter most, and protect them during compression

**Evidence from benchmarks (Qwen-14B example):**

| Scheme | Benchmark Score | vs. BF16 Baseline (73.6) |
|--------|----------------|--------------------------|
| BF16 (baseline) | 73.6 | — |
| INT W4A16 (4-bit weights, most aggressive) | 72.8 | **< 1 point drop** |
| FP W8A8 (8-bit float, weights+activations) | 74.3 | **Actually +0.7** (within noise) |

### Sparsification

An additional compression technique: **zero out the weights that contribute least to predictions**.

A common approach is **2:4 sparsity** — for every group of 4 values in a weight tensor, set exactly 2 to zero. The GPU can skip computing with those zeroed values, reducing both memory and computation. Particularly supported by NVIDIA H100 hardware.

---

## 5. Optimizing a Model with LLM Compressor

### The 4-Step Compression Workflow

```
1. Choose a Model    →  2. Pick an Algorithm  →  3. Choose Quantization Scheme  →  4. Inference with vLLM
   (Hugging Face or        (AWQ, GPTQ, etc.)      (W4A16, W8A8, etc.)               (next section)
    internal registry)
```

### Choosing the Right Algorithm

| Algorithm | Speed | VRAM Needed | Best For |
|-----------|-------|-------------|---------|
| **Round-to-Nearest** | Fastest | Lowest | Quick baseline; not suitable for production |
| **AWQ** (Activation-Aware Weight Quantization) | Fast | Low | Best accuracy/speed balance; popular on NVIDIA |
| **GPTQ** | Slower | High | Highest accuracy; industry standard; widely supported |
| **SparseGPT** | Varies | High | Sparsification (requires specific HW like H100) |
| **Smoothing** | — | — | Pre-processing step to flatten activation spikes |
| **Rotations** | — | — | Pre-processing step to redistribute information |

#### AWQ Explained Simply

AWQ is based on one key observation: **not all weights are equally important**.

```
Step 1: Run calibration data through the model
Step 2: Observe which weights correspond to large activation magnitudes
Step 3: Those weights → quantize more carefully (they matter more)
Step 4: Remaining weights → compress more aggressively
```

Result: Better accuracy than naive rounding, with lower VRAM requirements than GPTQ.

#### GPTQ Explained Simply

GPTQ takes a more mathematically rigorous approach:

```
Step 1: Compute the Hessian of the loss with respect to weights
        → Measures: "how sensitive is the model output to each specific weight?"
Step 2: Work through weights layer by layer
        → For each weight being quantized, update remaining weights to compensate
Step 3: The error introduced by quantizing one weight is corrected across others
```

Result: Very high accuracy (sometimes better than AWQ on certain benchmarks), but requires more compute and memory during the compression run.

### Hands-On: Quantizing with LLM Compressor

We'll use **Qwen3-0.6B** as the base model and apply **GPTQ with W4A16** (4-bit weights, 16-bit activations).

#### Step 1: Setup and Imports

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Model we're working with
base_model_path = "Qwen/Qwen3-0.6B"
quantized_model_path = "Qwen3-0.6B-W4A16"
```

#### Step 2: Define the Quantization Recipe

```python
from llmcompressor import oneshot
from llmcompressor.modifiers.quantization import GPTQModifier

# Define the recipe: HOW to quantize
recipe = GPTQModifier(
    scheme="W4A16",          # 4-bit weights, 16-bit activations
    targets="Linear",        # Target all Linear layers
    ignore=["lm_head"],      # Exclude output layer (preserves accuracy)
)

# The recipe tells LLM Compressor:
# - Which algorithm to use (GPTQ)
# - What precision to target (INT4 weights, BF16 activations)
# - Which layers to quantize (all Linear layers)
# - Which layers to skip (lm_head → keeps token predictions sharp)
```

#### Step 3: Run Calibration and Compress

```python
# Load the base model
model = AutoModelForCausalLM.from_pretrained(base_model_path)
tokenizer = AutoTokenizer.from_pretrained(base_model_path)

# Apply one-shot quantization
# This single call: loads calibration data, runs GPTQ, saves compressed model
oneshot(
    model=model,
    dataset="wikitext",          # Calibration data: Wikipedia articles
    recipe=recipe,
    num_calibration_samples=256, # 256 samples → solid default; more = diminishing returns
    max_seq_length=2048,         # Max tokens per sample; longer = more realistic calibration
    output_dir=quantized_model_path,
)
```

**Why these calibration parameters?**
- `num_calibration_samples=256`: More samples give a better picture of which weights matter, but past ~256, accuracy gains are tiny while runtime keeps growing.
- `max_seq_length=2048`: Lets the quantizer observe how weights behave across realistic context lengths.

#### Step 4: Compare Model Sizes

```python
import os

def get_model_size_gb(path):
    total_bytes = 0
    for f in os.listdir(path):
        filepath = os.path.join(path, f)
        if os.path.isfile(filepath):
            total_bytes += os.path.getsize(filepath)
    return total_bytes / (1024**3)

original_size = get_model_size_gb(base_model_path)
quantized_size = get_model_size_gb(quantized_model_path)
reduction = (1 - quantized_size / original_size) * 100

print(f"Original  (BF16): {original_size:.2f} GB")
print(f"Quantized (W4A16): {quantized_size:.2f} GB")
print(f"Size reduction: {reduction:.1f}%")

# Expected output for Qwen3-0.6B:
# Original  (BF16): ~1.2 GB
# Quantized (W4A16): ~0.7 GB
# Size reduction: ~42%
```

> **Why 42% instead of the theoretical 75%?**  
> We went from 16-bit to 4-bit (a 4× compression), but only the *linear layer weights* are quantized. The LM head, embedding layers, and normalization layers remain at higher precision. In larger models (70B+), the linear weights dominate more of the total size, so you get much closer to the theoretical 4× compression.

#### Step 5: Verify Quality with Perplexity

**Perplexity** measures how well a language model predicts text. Lower is better. If quantization degraded the model, perplexity will be noticeably higher.

```python
import torch
from datasets import load_dataset
import math

def calculate_perplexity(model, tokenizer, dataset_text, max_length=512, stride=256):
    """
    Slide a window across the text, computing cross-entropy loss at each position.
    Exponentiate the average loss → perplexity.
    """
    encodings = tokenizer(dataset_text, return_tensors="pt")
    input_ids = encodings.input_ids

    nlls = []
    prev_end_loc = 0

    for begin_loc in range(0, input_ids.size(1), stride):
        end_loc = min(begin_loc + max_length, input_ids.size(1))
        trg_len = end_loc - prev_end_loc

        input_chunk = input_ids[:, begin_loc:end_loc]
        target_ids = input_chunk.clone()
        target_ids[:, :-trg_len] = -100  # Only compute loss on new tokens

        with torch.no_grad():
            outputs = model(input_chunk, labels=target_ids)
            nlls.append(outputs.loss * trg_len)

        prev_end_loc = end_loc
        if end_loc == input_ids.size(1):
            break

    # Exponentiate average negative log-likelihood = perplexity
    ppl = torch.exp(torch.stack(nlls).sum() / end_loc)
    return ppl.item()

# Load the held-out test split (same dataset as calibration, but separate portion)
test_dataset = load_dataset("wikitext", "wikitext-2-raw-v1", split="test")
test_text = "\n\n".join(test_dataset["text"][:100])

# Compute for both models
quantized_ppl = calculate_perplexity(quantized_model, tokenizer, test_text)
base_ppl      = calculate_perplexity(base_model, tokenizer, test_text)

ppl_increase = ((quantized_ppl - base_ppl) / base_ppl) * 100

print(f"Base model perplexity:      {base_ppl:.2f}")
print(f"Quantized model perplexity: {quantized_ppl:.2f}")
print(f"Perplexity increase:        {ppl_increase:.1f}%")

# Example output:
# Base model perplexity:      32.79
# Quantized model perplexity: 35.48
# Perplexity increase:        ~8%
```

> **Interpretation:** An ~8% perplexity increase with a 42% model size reduction is an excellent tradeoff for most production deployments.

---

## 6. Serving LLMs Efficiently with vLLM — Part I (Core Concepts)

### Why the GPU Sits Idle Without Optimization

Generating one token requires a full forward pass — pulling **all** model weights from HBM into SRAM. The compute needed for a single token is tiny, but you pay the full memory movement cost regardless. Serving one request at a time leaves the Tensor Cores mostly waiting for data.

**The solution: batching** — process multiple requests together, using each weight read to serve many users simultaneously.

### Problem: Static Batching Fails for LLMs

Static batching collects a fixed group of requests, processes them together, and waits for **every single one** to finish before starting the next batch.

```
Static Batching (broken for LLMs):

Time →   T1  T2  T3  T4  T5  T6  T7  T8
Req 1:   ████████████████████ (done at T6)
Req 2:   █████████████████████████████ (done at T8)
Req 3:   ███████████ (done at T5)
Req 4:   ████████████████ (done at T7)

           ↑                         ↑
           All 4 start together       Batch 2 can't start until ALL finish at T8
                                      Slots for Req 3 sit IDLE from T5 to T8
```

This wastes GPU capacity because short requests get stuck waiting for long ones.

### Solution: Continuous Batching

```
Continuous Batching:

Time →   T1  T2  T3  T4  T5  T6  T7  T8
Req 1:   ████████████████████              (done T6)
Req 2:   █████████████████████████████    (done T8)
Req 3:   ███████████                      (done T5)
Req 4:   ████████████████                 (done T7)
Req 5:              ██████████████████    (starts at T5 when Req3 finishes!)
Req 6:                    ████████████   (starts at T6 when Req1 finishes!)

The batch is NEVER IDLE. The scheduler works at the token level.
```

### Problem: KV Cache Memory Fragmentation

Before PagedAttention, systems pre-allocated one **contiguous block** per request sized for the maximum possible context length:

```
Memory Layout (old approach):
┌──────────────────────────────────────────────────────────────────┐
│ Request A │▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 
│  (2048)  │ used │           NEVER USED (internal fragmentation)│
├──────────────────────────────────────────────────────────────────┤
│   GAP    │ too small for next allocation (external fragmentation)│
├──────────────────────────────────────────────────────────────────┤
│ Request B │▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└──────────────────────────────────────────────────────────────────┘

Result: Only 20–40% of KV cache memory actually held real tokens!
```

Three types of waste: internal fragmentation (empty reserved slots), external fragmentation (unusable gaps between allocations), and over-reservation (future slots that block other requests).

### Solution: PagedAttention

Inspired by virtual memory paging in operating systems, PagedAttention breaks the KV cache into **small, fixed-size blocks** that can sit *anywhere* in memory.

```
PagedAttention Memory Layout:

Physical GPU Memory:
┌────────┬────────┬────────┬────────┬────────┬────────┐
│Block 0 │Block 1 │Block 2 │Block 3 │Block 4 │Block 5 │
│(free)  │(Req B) │(free)  │(Req A) │(Req B) │(free)  │
└────────┴────────┴────────┴────────┴────────┴────────┘

Block Table for Request A:     Block Table for Request B:
  Logical Slot → Physical Block   Logical Slot → Physical Block
  0-3          → Block 3           0-3          → Block 1
  4-7          → Block 6           4-7          → Block 4
  (allocate only as needed)        (allocate only as needed)
```

**Step-by-step walkthrough:**

```python
# Example: Processing "Artificial Intelligence is the future of technology"

# 1. Prompt arrives: "Artificial Intelligence is"
#    → System grabs Block 3 (any free block)
#    → Stores KV cache for 3 tokens: Block table: [Block3: 3/4 filled]

# 2. Model generates: "the"
#    → Block 3 still has room → use it
#    → Block table: [Block3: 4/4 filled]

# 3. Model generates: "future"
#    → Block 3 is full! Grab Block 6 (any free block; doesn't need to be adjacent)
#    → Store "future" in Block 6
#    → Block table: [Block3, Block6]

# 4. To generate next token, attention needs all previous KVs:
#    → Read Block 3 from GPU memory → compute attention for tokens 1-4
#    → Read Block 6 from GPU memory → compute attention for token 5
#    → Blocks are non-contiguous, but block table stitches them together ✓
```

**Result:** No pre-allocation, no wasted slots, no fragmentation. Memory allocated only as each request actually needs it.

### Prefix Caching: Avoid Recomputing Shared Context

When multiple requests share the same prefix (e.g., all hit the same system prompt), the KV cache for that prefix only needs to be computed **once**.

```
Without Prefix Caching:
User 1: "You are a helpful assistant. [system prompt = 500 tokens] → User question 1"
         └── Full KV cache computed for 500-token prefix
User 2: "You are a helpful assistant. [same 500-token system prompt] → User question 2"
         └── Full KV cache computed AGAIN for the SAME prefix  (wasted!)
User 3: "You are a helpful assistant. [same 500-token system prompt] → User question 3"
         └── Full KV cache computed AGAIN  (wasted again!)

With Prefix Caching:
User 1: Full computation for 500-token prefix → CACHED
User 2: Cache hit! Skip 500 tokens → Only compute the new question
User 3: Cache hit! Skip 500 tokens → Only compute the new question

Benchmark: At 75% cache hit rate → throughput is ~4× higher
```

**Also applies to:**
- Multi-turn conversations (round 2's prompt includes all of round 1's content — cache the round 1 part)
- Few-shot examples shared across users
- Shared RAG context (retrieved documents)

---

## 7. Serving LLMs Efficiently with vLLM — Part II (Hands-On)

### Starting the vLLM Server

```bash
# Command to launch a vLLM inference server
vllm serve Qwen/Qwen3-0.6B \
    --dtype bfloat16 \              # Load weights in BF16 precision
    --max-model-len 4096            # Cap context window at 4096 tokens
                                    # (vLLM uses this to size the KV cache block pool)
```

What this does:
- Loads the model weights from Hugging Face (cached locally after first run)
- Enables PagedAttention, Continuous Batching, and Prefix Caching **by default**
- Exposes an **OpenAI-compatible HTTP API** on port 8000

### The OpenAI-Compatible API

vLLM implements the same routes as the OpenAI API:

| Endpoint | Purpose |
|----------|---------|
| `GET /v1/models` | List available models |
| `POST /v1/completions` | Text completion |
| `POST /v1/chat/completions` | Chat completion (messages format) |
| `POST /v1/embeddings` | Generate embeddings |

This means you can **prototype against OpenAI's hosted models and then switch to vLLM with one line change**.

### Sending Your First Request

```python
from openai import OpenAI

# Point the standard OpenAI client at your local vLLM server
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-needed"  # vLLM doesn't require auth locally
)

# Check what models are available
import requests
response = requests.get("http://localhost:8000/v1/models")
print(response.json())

# Send a completion request
response = client.chat.completions.create(
    model="Qwen/Qwen3-0.6B",
    messages=[
        {"role": "user", "content": "What is PagedAttention in one sentence?"}
    ],
    max_tokens=100,
    temperature=0.7,
    extra_body={"chat_template_kwargs": {"enable_thinking": False}}  # Disable thinking mode for speed
)

print(response.choices[0].message.content)
```

### Exploring Log Probabilities

vLLM lets you inspect the model's confidence in its own answers:

```python
response = client.completions.create(
    model="Qwen/Qwen3-0.6B",
    prompt="The capital of France is",
    max_tokens=3,
    temperature=0,
    logprobs=5  # Return top-5 token probabilities
)

# Examine what the model considered
for token_logprob in response.choices[0].logprobs.content:
    for top_token in token_logprob.top_logprobs:
        prob = math.exp(top_token.logprob)  # Convert log prob to probability
        print(f"  '{top_token.token}': {prob:.1%}")

# Example output for "The capital of France is":
#   ' Paris': 92.5%     ← High confidence = reliable answer
#   ' the':    3.1%
#   ' located': 2.2%
#   ...
```

Log probabilities are useful for:
- Detecting when a model is **guessing vs. confident**
- Catching hallucinations (low confidence on factual claims)
- Building uncertainty-aware applications

### Monitoring vLLM Metrics

vLLM exposes a Prometheus-compatible metrics endpoint:

```python
import requests
import re

def get_vllm_metrics(base_url="http://localhost:8000"):
    """Scrape key metrics from vLLM's metrics endpoint."""
    response = requests.get(f"{base_url}/metrics")
    text = response.text

    metrics = {}

    # Requests currently running (not queued)
    match = re.search(r'vllm:num_requests_running\s+([\d.]+)', text)
    if match:
        metrics["running_requests"] = float(match.group(1))

    # KV cache memory usage percentage
    match = re.search(r'vllm:gpu_cache_usage_perc\s+([\d.]+)', text)
    if match:
        metrics["gpu_cache_usage_pct"] = float(match.group(1)) * 100

    # Total tokens processed
    match = re.search(r'vllm:prompt_tokens_total\s+([\d.]+)', text)
    if match:
        metrics["total_prompt_tokens"] = float(match.group(1))

    return metrics

print(get_vllm_metrics())
# Example output:
# {'running_requests': 0.0, 'gpu_cache_usage_pct': 2.3, 'total_prompt_tokens': 847.0}
```

### Observing Continuous Batching in Action

```python
import asyncio
import time

async def send_request(client, prompt, request_id):
    """Send a request and track timing."""
    start = time.time()
    response = client.chat.completions.create(
        model="Qwen/Qwen3-0.6B",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50
    )
    elapsed = time.time() - start
    return request_id, elapsed, response.choices[0].message.content

# Send 5 requests concurrently
import concurrent.futures
prompts = [
    "Explain photosynthesis in one sentence.",
    "What is the speed of light?",
    "Name three programming languages.",
    "What is machine learning?",
    "Describe the water cycle briefly."
]

start_total = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    futures = [
        executor.submit(send_request, client, prompt, i)
        for i, prompt in enumerate(prompts)
    ]
    results = [f.result() for f in futures]

total_time = time.time() - start_total
print(f"Total time for 5 concurrent requests: {total_time:.2f}s")
# Key insight: This is FASTER than sequential (5 × single_request_time)
# because vLLM batches them all together!
```

### Observing Prefix Caching in Action

```python
system_prompt = """You are an expert assistant with deep knowledge of physics,
chemistry, biology, and mathematics. Provide clear, accurate answers.
(This system prompt is 30+ tokens — vLLM will cache it after the first request)"""

questions = [
    "What is Newton's second law?",
    "Explain the Krebs cycle briefly.",
    "What is the Pythagorean theorem?",
    "What is Avogadro's number?",
    "Describe DNA replication in one sentence.",
]

# Get baseline cache metrics BEFORE
metrics_before = get_vllm_metrics()

# Send all 5 questions with the same system prompt
for question in questions:
    client.chat.completions.create(
        model="Qwen/Qwen3-0.6B",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ],
        max_tokens=60
    )

# Get metrics AFTER
metrics_after = get_vllm_metrics()

# Check prefix cache queries (should have increased significantly!)
# After request 1: cache computed and stored
# Requests 2-5: cache HIT — system prompt KV not recomputed!
print(f"Cache queries before: {metrics_before.get('prefix_cache_queries', 'N/A')}")
print(f"Cache queries after:  {metrics_after.get('prefix_cache_queries', 'N/A')}")
# Expected: a significant increase, confirming cache reuse
```

---

## 8. Measuring What Matters: Benchmarking and Evaluation

### The Performance-Accuracy-Cost Triangle

```
              Accuracy
                 △
                /|\
               / | \
              /  |  \
             /   |   \
    Performance ──── Cost

Rules of thumb:
  High accuracy + Low latency  → Expensive
  Low cost + High accuracy     → Slower
  Low cost + Low latency       → Sacrifice accuracy
```

"The right tooling and techniques can push these limits" — but you need to *measure* to know where you stand.

### Two Complementary Measurement Types

| Type | Question Answered | Tool |
|------|------------------|------|
| **Model Benchmarking** | How fast does my deployment perform? How many requests can it handle? | GuideLLM |
| **Model Evaluation** | How accurate is the model? Does it give correct answers? | LM-Eval |

### Defining Your SLOs Before You Benchmark

SLOs (Service Level Objectives) must be defined *before* you run benchmarks. Example targets:

| Use Case | TTFT Target | ITL Target | End-to-End | Percentile |
|----------|-------------|------------|------------|------------|
| E-commerce chatbot (conversational speed) | < 200 ms | < 50 ms | — | p99 |
| RAG system (thoughtful, grounded answers) | < 300 ms | < 100 ms | < 3 seconds | p99 |

### Performance Benchmarking with GuideLLM

**GuideLLM** is an open-source tool from the vLLM project purpose-built for LLM load testing. Unlike generic load testers, it understands streaming responses and captures LLM-specific metrics.

#### GuideLLM Traffic Profiles

| Profile | Description | Best For |
|---------|-------------|---------|
| **Synchronous** | One request at a time, wait for each to finish | Clean baseline: single-request latency with no queuing |
| **Concurrent** | Fixed number of parallel streams | Shows how server holds up with multiple simultaneous users |
| **Constant** | Async requests at a fixed rate | Simulating steady, predictable traffic |
| **Poisson** | Random spacing following a Poisson distribution | Closest to real user traffic (unpredictable arrivals) |
| **Sweep** | Full spectrum: sync → concurrent, with constant rates in between | Capacity planning: full performance curve in one run |

#### Running GuideLLM

```bash
# Command-line usage
guidellm \
    --target http://localhost:8000 \    # Point at your vLLM server
    --profile synchronous \            # Traffic pattern
    --max-requests 100 \               # Number of requests to send
    --data-type emulated \             # Use synthetic data
    --prompt-tokens 32 \               # Input tokens per request
    --output-tokens 16 \               # Output tokens per request
    --output-dir ./benchmark-results   # Save results here
```

```python
# Programmatic usage via subprocess
import subprocess
import json

result = subprocess.run([
    "guidellm",
    "--target", "http://localhost:8000",
    "--profile", "synchronous",
    "--max-requests", "10",           # Small for quick testing; use 1000+ in production
    "--data-type", "emulated",
    "--prompt-tokens", "32",
    "--output-tokens", "16",
    "--num-prompt-samples", "32",     # Must be >= max-requests to avoid prompt repeats
                                      # (prefix cache hits would inflate results otherwise)
    "--output-dir", "./outputs"
], capture_output=True, text=True)
```

#### Interpreting GuideLLM Results

```python
import json
import glob

# Load the JSON results file
result_files = glob.glob("./outputs/*.json")
with open(result_files[0]) as f:
    results = json.load(f)

# Extract key metrics
print("Metric                  Mean      p50       p95       p99")
print("-" * 60)

for metric_name in ["time_to_first_token", "inter_token_latency", "e2e_latency"]:
    m = results["metrics"][metric_name]
    print(f"{metric_name:24} {m['mean']*1000:.0f}ms   {m['p50']*1000:.0f}ms   {m['p95']*1000:.0f}ms   {m['p99']*1000:.0f}ms")

# Example output:
# Metric                  Mean      p50       p95       p99
# time_to_first_token     145ms     132ms     287ms     421ms
# inter_token_latency     23ms      21ms      45ms      67ms
# e2e_latency             512ms     487ms     876ms     1203ms
```

> **Critical insight:** Always look at **p95 and p99**, not just the mean. If p99 is much higher than the mean, you have *tail latency problems* — 1 in 100 users waits much longer than average. Users notice this even if your average looks fine.

#### When to Benchmark

1. **Pre-deployment:** Compare model sizes and configurations before committing to hardware
2. **Cost & capacity planning:** Determine throughput per server → calculate how many you need
3. **Regression & A/B testing:** Catch performance changes after model updates or quantization
4. **Hardware evaluation:** Find the breaking point (load where latency climbs sharply) for autoscaling

### Accuracy Evaluation with LM-Eval

**LM-Eval** (LM Evaluation Harness by EleutherAI) runs standardized accuracy benchmarks across many models, producing comparable results.

#### Common Benchmarks

| Benchmark | Tests | Type |
|-----------|-------|------|
| **MMLU** | General knowledge across 57 subjects | Multiple choice |
| **HellaSwag** | Common-sense reasoning about everyday events | Sentence completion |
| **GSM8K** | Grade-school math word problems | Math reasoning |
| **ARC** | Science questions at elementary/challenge level | Multiple choice |
| **TruthfulQA** | Whether models give truthful answers to tricky questions | Open/multiple choice |
| **GPQA-Diamond** | Expert-validated science questions | Multiple choice |
| **AIME 2024** | Competition-level math (30 problems) | Math |
| **MATH-500** | 500 challenging math problems | Math |

#### Running LM-Eval Against Your vLLM Server

```python
import lm_eval

# Evaluate against the running vLLM server (OpenAI-compatible endpoint)
results = lm_eval.simple_evaluate(
    model="openai-completions",          # Use the OpenAI-compatible endpoint
    model_args={
        "base_url": "http://localhost:8000/v1/completions",
        "model": "Qwen/Qwen3-0.6B",
        "tokenizer": "Qwen/Qwen3-0.6B",
    },
    tasks=["hellaswag"],                 # Which benchmarks to run
    num_fewshot=0,                       # Zero-shot (no examples in prompt)
    limit=20,                            # Limit to 20 examples (use full set in production)
    log_samples=False,
)

# Extract accuracy
acc = results["results"]["hellaswag"]["acc,none"]
acc_norm = results["results"]["hellaswag"]["acc_norm,none"]

print(f"HellaSwag Accuracy:            {acc:.1%}")
print(f"HellaSwag Normalized Accuracy: {acc_norm:.1%}")

# Note: With only 20 examples, expect high variance (±10%)
# The full HellaSwag test set has ~10,000 examples for reliable results
```

#### Understanding Results with Model Cards

Published quantized models include accuracy tables on their model cards. Example from Red Hat AI's Qwen3-0.6B W4A16 model card:

| Benchmark | Base (BF16) | Quantized (W4A16) | Recovery |
|-----------|-------------|-------------------|---------|
| HellaSwag | 43.04 | 41.02 | 95.3% |
| MMLU | 47.2 | 46.8 | 99.2% |
| GSM8K | 51.3 | 50.1 | 97.7% |
| *(average)* | — | — | **~93–100%** |

**Why your lm_eval result (30%) differs from the model card (43%):**
- You ran 20 examples in zero-shot mode
- The model card used ~10,000 examples with 10 in-context examples per prompt (10-shot)
- More examples + few-shot prompting = lower variance and higher absolute accuracy scores

### Your Three Sources of Evidence

```
GuideLLM           → "How does this deployment PERFORM?"
                     (latency, throughput, consistency under load)

LM-Eval            → "How well does this model ANSWER?"
                     (accuracy on knowledge, reasoning, math benchmarks)

Published Model Card → "What do quantization benchmarks say?"
                     (pre-computed accuracy recovery at different precision levels)

A good deployment needs to clear BOTH GuideLLM AND LM-Eval thresholds.
```

---

## 9. Putting It All Together: Final Recap & Next Steps

### The Complete Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FULL OPTIMIZED DEPLOYMENT PIPELINE               │
├─────────────────┬───────────────────────┬───────────────────────────┤
│   1. OPTIMIZE   │      2. DEPLOY        │     3. BENCHMARK          │
│                 │                       │                           │
│ LLM Compressor  │  vLLM inference       │  GuideLLM                 │
│                 │  server with:         │  → TTFT, ITL, throughput  │
│ • Pick model    │  • PagedAttention     │  → p50, p95, p99          │
│ • Choose algo   │  • Continuous         │                           │
│   (AWQ, GPTQ)  │    Batching           │  LM-Eval                  │
│ • Choose scheme │  • Prefix Caching     │  → HellaSwag, MMLU, etc.  │
│   (W4A16, W8A8) │                       │  → accuracy recovery      │
│ • Run oneshot() │  OpenAI-compatible    │                           │
│ • Verify PPL    │  API on port 8000     │  Model Card               │
│                 │                       │  → published benchmarks   │
└─────────────────┴───────────────────────┴───────────────────────────┘
```

### How the Gains Compound

| Setup | Relative Cost |
|-------|---------------|
| Naive (full precision, one request at a time) | 100× (baseline) |
| + Continuous Batching + PagedAttention (vLLM) | ~10× reduction |
| + Model Quantization on top | Reduce further to ~2–3× of baseline |

**Individual techniques are powerful; combining them is transformative.**

### Real-World Case Studies

**Case 1: Database Company — SQL Generation with Llama 70B**
- Had 8 GPUs available; struggled with quantization accuracy
- Applied W4A16 with LLM Compressor → retained >99% accuracy
- Reduced GPU requirements from 8 → **2 GPUs (75% infrastructure savings)**

**Case 2: Retail Company — JSON Extraction at Scale**
- Running fine-tuned Llama-70B across millions of records daily
- Initial quantization attempt showed no benefit (wrong method for their workload)
- Right optimization + tuning batch size and concurrency → **40% reduction in GPU hours**

**Key lesson:** Start with quantization as an easy win, then tune for your specific workload and hardware.

### Choosing the Right Quantization Scheme in Production

| Scheme | Compression | Speedup | Hardware | Best For |
|--------|-------------|---------|----------|---------|
| **INT W4A16** | ~3.7× | Up to 3× | Most accelerators | Latency-sensitive; maximum memory savings |
| **FP W8A8** | ~2× | Up to 3× | Hopper+ (H100) | General server workloads; best compute speedup |

### vLLM: One Platform Across the Entire Ecosystem

```
Models Supported:          Hardware Supported:         Deployment Targets:
Llama, Qwen, DeepSeek,    NVIDIA GPUs,                Edge devices,
Gemma, Mistral, Granite,  AMD Instinct,               Private cloud,
and more...               Intel Gaudi, Google TPUs,   Public cloud
                          AWS Neuron, IBM Spyre
```

### Quick Reference: Key Tools and Their Roles

| Tool | Role | When to Use |
|------|------|-------------|
| **LLM Compressor** | Compress and quantize models | Before deployment; saves memory and speeds up inference |
| **vLLM** | Production inference server | Always; handles all serving optimizations automatically |
| **GuideLLM** | Performance load testing | Pre-deployment, capacity planning, A/B testing, hardware evaluation |
| **LM-Eval** | Accuracy benchmarking | Verify model quality after quantization or before deployment |

### Summary of Key Formulas and Rules of Thumb

```
KV Cache per token (Llama 3 70B):
  2 × 80 layers × 8 KV heads × 128 head_dim × 2 bytes = 320 KB

Model size (BF16):
  num_parameters × 2 bytes = size in bytes

After W4A16 quantization (linear layers only):
  Overall model reduction ≈ 40–75% (depends on model size; larger = closer to theoretical)

Calibration samples:
  256 samples = solid default; more gives diminishing returns past ~512

GPU memory rule of thumb for Llama 70B:
  Minimum 2× 80GB GPUs (load model) → Production: 4× 80GB (leaves room for KV cache)
```

### Next Steps After This Course

1. **Explore LLM Compressor further** — Try quantizing your own models on GitHub: `neuralmagic/llmcompressor`

2. **Spin up vLLM** — Install and serve a model locally:
   ```bash
   pip install vllm
   vllm serve meta-llama/Llama-3.2-1B-Instruct
   ```

3. **Benchmark with GuideLLM** — Generate realistic traffic patterns against your deployment:
   ```bash
   pip install guidellm
   guidellm --target http://localhost:8000 --profile sweep --max-requests 500
   ```

4. **Evaluate with LM-Eval** — Run standardized benchmarks:
   ```bash
   pip install lm-eval
   lm_eval --model openai-completions --tasks mmlu --model_args base_url=http://localhost:8000/v1/completions
   ```

5. **Go deeper with llm-d** — The next frontier: disaggregated AI serving that separates the *prefill* and *decode* phases of LLM inference to optimize each independently.

---

## Appendix: Glossary

| Term | Definition |
|------|-----------|
| **Autoregressive generation** | Generating text one token at a time, where each new token depends on all previous tokens |
| **BF16 (Brain Float 16)** | 16-bit floating point format developed by Google; same range as FP32 but less precision |
| **Continuous batching** | Processing multiple requests together, with new requests filling slots immediately when others finish |
| **GPTQ** | Gradient-based Post-Training Quantization; uses second-order information (Hessian) for high-accuracy quantization |
| **HBM (High Bandwidth Memory)** | The main GPU memory (VRAM); holds model weights and KV cache |
| **INT4 / INT8** | Integer data types using 4 or 8 bits; used for weight quantization |
| **KV Cache** | Stored key and value vectors from previous tokens, enabling reuse across generation steps |
| **LM-Eval** | EleutherAI's LM Evaluation Harness; runs standardized accuracy benchmarks |
| **PagedAttention** | vLLM's technique of storing KV cache in small, non-contiguous blocks to eliminate memory fragmentation |
| **Perplexity** | Measure of how well a language model predicts text; lower = better |
| **Prefix Caching** | Reusing computed KV cache blocks when multiple requests share the same starting tokens |
| **Quantization** | Storing model weights at lower numerical precision (fewer bits) to reduce memory and computation |
| **SRAM** | Small, extremely fast on-chip GPU memory; where Tensor Cores operate |
| **SLO (Service Level Objective)** | Measurable target for deployment performance (e.g., TTFT < 200ms at p99) |
| **Sparsification** | Zeroing out the least important weights so computation can be skipped |
| **Tensor** | A multi-dimensional array of numbers (scalar = 0D, vector = 1D, matrix = 2D) |
| **Tensor Cores** | Specialized GPU hardware for fast matrix multiplications |
| **Throughput** | Average output tokens per second across all concurrent requests |
| **TTFT (Time to First Token)** | How long a user waits before seeing any output from the model |
| **vLLM** | Open-source inference engine implementing PagedAttention, Continuous Batching, Prefix Caching |
| **W4A16 / W8A8** | Notation for quantization schemes: W = weights precision, A = activations precision |
| **AWQ (Activation-Aware Weight Quantization)** | Calibration-based quantization that protects weights with large activation magnitudes |
