const topics = {
    "Arrays & Hashing": [
        { "name": "Contains Duplicate", "difficulty": "Medium", "solved": true },
        { "name": "Valid Anagram", "difficulty": "Medium", "solved": true },
        { "name": "Two Sum", "difficulty": "Medium", "solved": true },
        { "name": "Group Anagrams", "difficulty": "Medium", "solved": true },
        { "name": "Top K Frequent Elements", "difficulty": "Medium", "solved": true },
        { "name": "Encode and Decode Strings", "difficulty": "Medium", "solved": true },
        { "name": "Product of Array Except Self", "difficulty": "Medium", "solved": true },
        { "name": "Valid Sudoku", "difficulty": "Medium", "solved": true },
        { "name": "Longest Consecutive Sequence", "difficulty": "Medium", "solved": true }
    ],
    "Two Pointers": [
        { "name": "Valid Palindrome", "difficulty": "Easy", "solved": true },
        { "name": "Two Sum II Input Array Is Sorted", "difficulty": "Medium", "solved": true },
        { "name": "3Sum", "difficulty": "Medium", "solved": true },
        { "name": "Container With Most Water", "difficulty": "Medium", "solved": true },
        { "name": "Trapping Rain Water", "difficulty": "Hard", "solved": true }
    ],

    "Binary Search": [
        { name: "Binary Search", difficulty: "Easy", solved: true },
        { name: "Search a 2D Matrix", difficulty: "Medium", solved: true },
        { name: "Koko Eating Bananas", difficulty: "Medium", solved: true },
        { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", solved: true },
        { name: "Search in Rotated Sorted Array", difficulty: "Medium", solved: true },
        { name: "Time Based Key Value Store", difficulty: "Medium", solved: true },
        { name: "Median of Two Sorted Arrays", difficulty: "Hard", solved: true }
    ],
    "Sliding Window": [
        { name: "Best Time to Buy And Sell Stock", difficulty: "Easy", solved: true },
        { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", solved: true },
        { name: "Longest Repeating Character Replacement", difficulty: "Medium", solved: true },
        { name: "Permutation In String", difficulty: "Medium", solved: true },
        { name: "Minimum Window Substring", difficulty: "Hard", solved: true },
        { name: "Sliding Window Maximum", difficulty: "Hard", solved: true }
    ],
    "Tree": [
        { name: "Invert Binary Tree", difficulty: "Easy", solved: false },
        { name: "Maximum Depth of Binary Tree", difficulty: "Easy", solved: false },
        { name: "Diameter of Binary Tree", difficulty: "Easy", solved: false },
        { name: "Balanced Binary Tree", difficulty: "Easy", solved: false },
        { name: "Same Tree", difficulty: "Easy", solved: false },
        { name: "Subtree of Another Tree", difficulty: "Easy", solved: false },
        { name: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", solved: true },
        { name: "Binary Tree Level Order Traversal", difficulty: "Medium", solved: true },
        { name: "Binary Tree Right Side View", difficulty: "Medium", solved: true },
        { name: "Count Good Nodes In Binary Tree", difficulty: "Medium", solved: true },
        { name: "Validate Binary Search Tree", difficulty: "Medium", solved: true },
        { name: "Kth Smallest Element in a BST", difficulty: "Medium", solved: false },
        { name: "Construct Binary Tree From Preorder And Inorder Traversal", difficulty: "Medium", solved: false },
        { name: "Binary Tree Maximum Path Sum", difficulty: "Hard", solved: true },
        { name: "Serialize And Deserialize Binary Tree", difficulty: "Hard", solved: true }
    ],
    "Trie": [
        { name: "Implement Trie Prefix Tree", difficulty: "Medium", solved: true },
        { name: "Design Add And Search Words Data Structure", difficulty: "Medium", solved: true },
        { name: "Word Search II", difficulty: "Hard", solved: true }
    ],
    "Backtracking": [
        { name: "Subsets", difficulty: "Medium", solved: true },
        { name: "Combination Sum", difficulty: "Medium", solved: true },
        { name: "Permutations", difficulty: "Medium", solved: true },
        { name: "Subsets II", difficulty: "Medium", solved: true },
        { name: "Combination Sum II", difficulty: "Medium", solved: true },
        { name: "Word Search", difficulty: "Medium", solved: true },
        { name: "Palindrome Partitioning", difficulty: "Medium", solved: false },
        { name: "Letter Combinations of a Phone Number", difficulty: "Medium", solved: true },
        { name: "N-Queens", difficulty: "Hard", solved: true }
    ],
    "Graph": [
        { name: "Number of Islands", difficulty: "Medium", solved: true },
        { name: "Max Area of Island", difficulty: "Medium", solved: true },
        { name: "Clone Graph", difficulty: "Medium", solved: true },
        { name: "Walls And Gates", difficulty: "Medium", solved: true },
        { name: "Rotting Oranges", difficulty: "Medium", solved: true },
        { name: "Pacific Atlantic Water Flow", difficulty: "Medium", solved: true },
        { name: "Surrounded Regions", difficulty: "Medium", solved: true },
        { name: "Course Schedule", difficulty: "Medium", solved: true },
        { name: "Course Schedule II", difficulty: "Medium", solved: true },
        { name: "Graph Valid Tree", difficulty: "Medium", solved: true },
        { name: "Number of Connected Components In An Undirected Graph", difficulty: "Medium", solved: false },
        { name: "Redundant Connection", difficulty: "Medium", solved: false },
        { name: "Word Ladder", difficulty: "Hard", solved: true }
    ],
    "Dynamic Programming": [
        { name: "Climbing Stairs", difficulty: "Easy", solved: false },
        { name: "Min Cost Climbing Stairs", difficulty: "Easy", solved: false },
        { name: "House Robber", difficulty: "Medium", solved: true },
        { name: "House Robber II", difficulty: "Medium", solved: true },
        { name: "Longest Palindromic Substring", difficulty: "Medium", solved: true },
        { name: "Palindromic Substrings", difficulty: "Medium", solved: true },
        { name: "Decode Ways", difficulty: "Medium", solved: true },
        { name: "Coin Change", difficulty: "Medium", solved: true },
        { name: "Maximum Product Subarray", difficulty: "Medium", solved: false },
        { name: "Word Break", difficulty: "Medium", solved: true },
        { name: "Longest Increasing Subsequence", difficulty: "Medium", solved: true },
        { name: "Partition Equal Subset Sum", difficulty: "Medium", solved: true }
    ],
    "Advance Graph": [
        { name: "Reconstruct Itinerary", difficulty: "Hard", solved: true },
        { name: "Min Cost to Connect All Points", difficulty: "Medium", solved: true },
        { name: "Network Delay Time", difficulty: "Medium", solved: true },
        { name: "Swim In Rising Water", difficulty: "Hard", solved: true },
        { name: "Alien Dictionary", difficulty: "Hard", solved: false },
        { name: "Cheapest Flights Within K Stops", difficulty: "Medium", solved: true }
    ]

};

function showProblems(topic) {
    const problemList = document.getElementById("problem-list");
    const topicName = document.getElementById("topic-name");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    topicName.textContent = topic;
    problemList.innerHTML = "";

    const problems = topics[topic];
    let solvedCount = 0;

    problems.forEach(problem => {
        const row = document.createElement("tr");

        const statusCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.disabled = true;
        checkbox.checked = problem.solved;
        statusCell.appendChild(checkbox);
        row.appendChild(statusCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = problem.name;
        row.appendChild(nameCell);

        const difficultyCell = document.createElement("td");
        difficultyCell.textContent = problem.difficulty;
        row.appendChild(difficultyCell);

        problemList.appendChild(row);

        if (problem.solved) solvedCount++;
    });

    const progressPercent = (solvedCount / problems.length) * 100;
    progressBar.style.width = progressPercent + "%";
    progressText.textContent = `${solvedCount}/${problems.length} solved`;
}

// script.js

// Data
const data = [
    { logo: 'images/icons/leetcode_logo.png', name: 'LeetCode', link: "https://leetcode.com/", number: 102 },
    { logo: 'images/icons/codeforces_logo.png', name: 'Codeforeces', link: "https://codeforces.com/", number: 400 },
    { logo: 'images/icons/uva_logo.png', name: 'UVa', link: "https://uhunt.onlinejudge.org/id/523872", number: 249 },
    { logo: 'images/icons/lightoj_logo.png', name: 'LightOJ', link: "", number: 125 },
    { logo: 'images/icons/spoj_logo.png', name: 'SPOJ', link: "", number: 51 },
];

// Function to generate table rows dynamically
function generateTableRows() {
    const tbody = document.getElementById('dynamicTable').querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(item => {
        const row = document.createElement('tr');
        // Adding hover style using JavaScript
        // row.style.transition = 'background-color 0.3s ease'; // Smooth transition
        // row.addEventListener('mouseleave', function() {
        //     row.style.backgroundColor = ''; // Remove background color on mouse leave
        // });

        // Logo
        const logoCell = document.createElement('td');
        const logoImg = document.createElement('img');
        logoImg.src = item.logo;
        logoImg.alt = item.name;
        logoImg.style.width = '100px';
        logoImg.style.height = '30px';
        logoImg.style.objectFit = 'contain';
        logoCell.appendChild(logoImg);

        // Website Name
        const nameCell = document.createElement('td');

        const weblink = document.createElement('a');
        weblink.href = item.link

        weblink.textContent = item.name;

        nameCell.appendChild(weblink)
        // Number
        const numberCell = document.createElement('td');
        numberCell.textContent = item.number;

        row.appendChild(logoCell);
        row.appendChild(nameCell);
        row.appendChild(numberCell);

        tbody.appendChild(row);
    });
}

// Initialize table
// generateTableRows();
// Ensure function runs when page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    generateTableRows(data);
    showProblems('Arrays & Hashing');
});
