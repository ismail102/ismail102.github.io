function generateDashboard() {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2); // Centered at latitude 20, longitude 0

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Random user locations
    const userLocations = [
        { name: 'User 1', coords: [37.7749, -122.4194] }, // San Francisco
        { name: 'User 2', coords: [51.5074, -0.1278] },  // London
        { name: 'User 3', coords: [35.6895, 139.6917] }, // Tokyo
        { name: 'User 4', coords: [-33.8688, 151.2093] } // Sydney
    ];

    // // Add markers with custom user icons
    // userLocations.forEach(user => {
    //     const icon = L.divIcon({
    //         className: 'custom-icon',
    //         html: `<img src="https://via.placeholder.com/30" alt="${user.name}" style="width:30px;height:30px;">`,
    //         iconSize: [30, 30]
    //     });

    //     L.marker(user.coords, { icon }).addTo(map).bindPopup(`<strong>${user.name}</strong>`);
    // });
}

// function generateLineGraph() {

//      // Get the canvas element
//      const ctx = document.getElementById('lineChart').getContext('2d');

//      // Generate random data for 8 lines
//      function generateRandomData() {
//          const data = [];
//          for (let i = 0; i < 8; i++) {
//              const lineData = [];
//              for (let j = 0; j < 13; j++) { // 12 data points
//                  lineData.push(Math.floor(Math.random() * 100));
//              }
//              data.push(lineData);
//          }
//          return data;
//      }

//      // Colors for each line
//      const colors = [
//          'rgba(255, 99, 132, 0.6)',
//          'rgba(54, 162, 235, 0.6)',
//          'rgba(255, 206, 86, 0.6)',
//          'rgba(75, 192, 192, 0.6)',
//          'rgba(153, 102, 255, 0.6)',
//          'rgba(255, 159, 64, 0.6)',
//          'rgba(100, 181, 246, 0.6)',
//          'rgba(204, 0, 102, 0.6)'
//      ];

//      // Random data for the lines
//      const initialData  = generateRandomData();

//      const categories = ["Entertainment", "Sports", "Finance", "Art", "Education", "Travel", "Health", "Politics"];

//      // Create datasets for the lines
//      const datasets = initialData .map((data, index) => ({
//          label: categories[index],
//          data: data,
//          borderColor: colors[index],
//          fill: false,
//          tension: 0.4 // Smooth curves
//      }));

//      // Chart.js Configuration
//      const config = {
//          type: 'line',
//          data: {
//              labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2022', '2023', '2024'], // Months
//              datasets: datasets
//          },
//          options: {
//              responsive: true,
//              plugins: {
//                  legend: {
//                      position: 'top'
//                  }
//              },
//              scales: {
//                  x: {
//                      title: {
//                          display: true,
//                          text: 'Year'
//                      }
//                  },
//                  y: {
//                      title: {
//                          display: true,
//                          text: 'Category'
//                      },
//                      beginAtZero: true
//                  }
//              }
//          }
//      };

//      // Create and render the chart
//      const lineChart = new Chart(ctx, config);

//     //  // Update the chart dynamically every 5 seconds
//     //  setInterval(() => {
//     //      const newData = generateRandomData();
//     //      newData.forEach((data, index) => {
//     //          lineChart.data.datasets[index].data = data;
//     //      });
//     //      lineChart.update();
//     //  }, 5000);

//     // Gradually update the data from 2011 to 2014
//     let year = 0; // Start from 2012 (index 1)
//     const interval = setInterval(() => {
//         if (year < 14) { // Until 2014
//             initialData.forEach((data, index) => {
//                 data[year] = Math.floor(Math.random() * 100); // Gradually generate data for the year
//             });
//             lineChart.update();
//             year++;
//         } else {
//             clearInterval(interval); // Stop the interval once 2014 is reached
//         }
//     }, 5000); // Update the chart every 5 seconds
// }

function generateLineGraph() {

    // Get the canvas element
    const ctx = document.getElementById('lineChart').getContext('2d');

    // Generate initial data for 2011
    function generateInitialData() {
        const data = [];
        for (let i = 0; i < 8; i++) {
            const lineData = [];
            for (let j = 0; j < 14; j++) { // Only 2011 to 2024
                lineData.push(Math.floor(Math.random() * 100));
            }
            data.push(lineData);
        }
        return data;
    }

    // Colors for each line
    const colors = [
        'rgba(139, 0, 0, 0.6)',     // Dark Red
        'rgba(0, 0, 139, 0.6)',     // Dark Blue
        'rgba(0, 128, 128, 0.6)',   // Dark Teal
        'rgba(204, 153, 0, 0.6)',   // Dark Yellow
        'rgba(75, 0, 130, 0.6)',    // Dark Purple
        'rgba(204, 85, 0, 0.6)',    // Dark Orange
        'rgba(0, 0, 128, 0.6)',     // Dark Navy Blue
        'rgba(128, 0, 64, 0.6)'     // Dark Magenta
    ];

    // Initial data for the lines (2011 to 2014)
    const initialData = generateInitialData();

    const categories = ["Entertainment", "Sports", "Finance", "Art", "Education", "Travel", "Health", "Politics"];

    // Create datasets for the lines
    const datasets = initialData.map((data, index) => ({
        label: categories[index],
        data: data.slice(0, 1), // Start with only 2011 data,
        backgroundColor: colors[index],
        borderColor: colors[index],
        fill: false,
        tension: 0.4 // Smooth curves
    }));

    // Chart.js Configuration
    const config = {
        type: 'line',
        data: {
            labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2022', '2023', '2024'], // Start with only 2011 label initially
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                          size: 20,
                          weight: 'bold'
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    },
                    ticks: {
                        font: {
                          size: 30,
                          weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Category'
                    },
                    beginAtZero: true,
                    ticks: {
                        font: {
                          size: 30,
                          weight: 'bold'
                        }
                    }
                }
            }
        }
    };

    // Create and render the chart
    const lineChart = new Chart(ctx, config);

    // Gradually update the data from 2011 to 2024
    let year = 1; // Start from 2012 (index 1)
    const interval = setInterval(() => {
        if (year < 14) { // Until 2024 (index 13)
            // Update data for the current year
            initialData.forEach((data, index) => {
                datasets[index].data.push(data[year]); // Add data for the current year
            });

            // Update the labels and dataset for the year
            // config.data.labels.push(`${2011 + year}`); // Add the current year to labels
            lineChart.update(); // Re-render the chart

            year++;
        } else {
            clearInterval(interval); // Stop the interval once 2024 is reached
        }
    }, 5000); // Update the chart every 5 seconds
}


function createCard(user) {
        return `
            <div class="small-card">
                <img src="${user.imgSrc}" alt="User Icon" class="rounded-circle mb-2">
                <h6><strong>${user.name}</strong></h6>
                <small style="font-weight: lighter;">${user.job}</small><br />
                <small style="font-weight: lighter;">${user.location}</small><br />
                <button class="btn btn-primary btn-sm mt-2">Send Request</button>
            </div>
        `;
}
    
function displayFriendSuggestion() {
    const users = [
        { name: "John Doe", job: "Software Engineer", location: "New York, USA", imgSrc: "images/icons/users/user-icon1.png" },
        { name: "Jane Smith", job: "Product Manager", location: "San Francisco, USA", imgSrc: "images/icons/users/user-icon5.png" },
        { name: "Michael Brown", job: "Data Scientist", location: "Chicago, USA", imgSrc: "images/icons/users/user-icon3.png" },
        { name: "Emily Davis", job: "Actor", location: "Los Angeles, USA", imgSrc: "images/icons/users/user-icon2.png" },
        { name: "Michael Brown", job: "Footballer", location: "Chicago, USA", imgSrc: "images/icons/users/user-icon1.png" },
        { name: "Emily Davis", job: "Journalist", location: "Los Angeles, USA", imgSrc: "images/icons/users/user-icon3.png" },
        { name: "Emily Davis", job: "Faculty", location: "Los Angeles, USA", imgSrc: "images/icons/users/user-icon5.png" },
        { name: "Michael Brown", job: "Student", location: "Chicago, USA", imgSrc: "images/icons/users/user-icon2.png" },
        { name: "Emily Davis", job: "UX Designer", location: "Los Angeles, USA", imgSrc: "images/icons/users/user-icon1.png" }
    ];

    const container = document.getElementById("friend-suggestion");
    users.forEach(user => {
        container.innerHTML += createCard(user);
    });
}

// Chart creation function
function createChart(chartId, chartContainer) {
    const evolutions = ["Next Evolution", "2nd Evolution", "3rd Evolution", "4th Evolution"];
    const categories = ["Entertainment", "Sports", "Finance", "Art", "Education", "Travel", "Health", "Politics"];
    const bardataset = [
        [0.3124, 0.2191, 0.2387, 0.0493, 0.5249, 0.6123, 0.3106, 0.2439],
        [0.3853, 0.3156, 0.9440, 0.8940, 0.7117, 0.6072, 0.6723, 0.2415],
        [0.4167, 0.4153, 0.6646, 0.3468, 0.1907, 0.4581, 0.5591, 0.4967],
        [0.5530, 0.2026, 0.2208, 0.5082, 0.9824, 0.6332, 0.4836, 0.8974]
    ]

    // Define an array of colors for the labels
    const colors = [
        'rgba(139, 0, 0, 0.6)',     // Dark Red
        'rgba(0, 0, 139, 0.6)',     // Dark Blue
        'rgba(0, 128, 128, 0.6)',   // Dark Teal
        'rgba(204, 153, 0, 0.6)',   // Dark Yellow
        'rgba(75, 0, 130, 0.6)',    // Dark Purple
        'rgba(204, 85, 0, 0.6)',    // Dark Orange
        'rgba(0, 0, 128, 0.6)',     // Dark Navy Blue
        'rgba(128, 0, 64, 0.6)'     // Dark Magenta
    ];

       
    // Create a unique canvas element
    const canvas = document.createElement('canvas');
    canvas.style= 'canvas-bargraph';
    canvas.height = 300; // Set the height of the chart to 400px
    canvas.id = chartId; // Assign the same ID as `chartId`

    // Create a card to contain the chart
    const card = document.createElement('div');
    card.classList.add('bar-chart-card', 'card', 'p-3', 'mb-3');
    card.setAttribute('data-chart-id', chartId); // Set data attribute
    card.innerHTML = `
        <h6>${evolutions[Number(chartId)-1]}</h6>
    `;
    card.appendChild(canvas); // Append the canvas to the card

    // Append the card to the container
    chartContainer.appendChild(card);

    // Get the context of the newly added canvas element
    const chartCtx = canvas.getContext('2d');

    // Create a new bar chart using Chart.js
    const barChart = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: `${chartId} Data`,
                data: bardataset[Number(chartId)-1],
                backgroundColor: colors,
                // borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: false,
                    text: 'Custom Chart Title',
                    font: {
                      size: 20,
                      weight: 'bold'
                    }
                },
                legend: {
                    display: false, // Hide the legend if not needed
                    labels: {
                        font: {
                          size: 20,
                          weight: 'bold'
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                      font: {
                        size: 20, // Increase font size
                        weight: 'bold' // Make text bold
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 20,
                        weight: 'bold'
                      }
                    }
                  }
            }
        }
    });
}

function displayBarGraph() {
    // Event listener for checkbox changes
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const chartId = checkbox.value; // Use checkbox value as chartId
            const chartContainer = document.getElementById('bar-chart-cards-container');

            if (checkbox.checked) {
                // Add the chart
                createChart(chartId, chartContainer);
            } else {
                // Remove the chart
                console.log(chartId)
                const chartCard = document.querySelector(`.bar-chart-card[data-chart-id="${chartId}"]`);
                console.log(chartCard)
                if (chartCard) {
                    console.log("removed")
                    chartCard.remove(); // Remove the chart card
                }
            }
        });
    });
}

    // Initialize table
// generateTableRows();
// Ensure function runs when page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    generateDashboard();
    generateLineGraph();
    displayFriendSuggestion();
    displayBarGraph();
});
