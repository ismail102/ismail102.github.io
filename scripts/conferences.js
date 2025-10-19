// JavaScript for dynamically loading the conference data

// Sample JSON data
const conferenceData = [
    {
        "conference": "PoPETS",
        "cycle": "3",
        "submissionDeadline": "Nov 30, 2025",
        "notificationDate": "Feb 01, 2026",
        "location": "Calgary, Canada.",
        "link": "https://petsymposium.org/cfp26.php"
    },
    {
        "conference": "PoPETS",
        "cycle": "4",
        "submissionDeadline": "Feb 28, 2026",
        "notificationDate": "May 01, 2026",
        "location": "Calgary, Canada.",
        "link": "https://petsymposium.org/cfp26.php"
    },
    {
        "conference": "ACM ASIACCS",
        "cycle": "2",
        "submissionDeadline": "Dec 12, 2025",
        "notificationDate": "Mar 10, 2026",
        "location": "Bangalore, India.",
        "link": "https://asiaccs2026.cse.iitkgp.ac.in/"
    },
    {
        "conference": "ICWSM 2026",
        "cycle": "2",
        "submissionDeadline": "Sep 15, 2025",
        "notificationDate": "Nov 15, 2025",
        "location": "Los Angeles, USA.",
        "link": "https://www.icwsm.org/2026/index.html"
    },
    {
        "conference": "ICWSM 2026",
        "cycle": "3",
        "submissionDeadline": "Jan 15, 2026",
        "notificationDate": "Mar 15, 2026",
        "location": "Los Angeles, USA.",
        "link": "https://www.icwsm.org/2026/index.html"
    },
     {
        "conference": "USENIX 2026",
        "cycle": "2",
        "submissionDeadline": "Jan 29, 2026",
        "notificationDate": "May 14, 2026",
        "location": "Baltimore, MD, USA.",
        "link": "https://www.usenix.org/conference/usenixsecurity26/call-for-papers"
    },
    {
        "conference": "IEEE S&P",
        "cycle": "2",
        "submissionDeadline": "Nov 06, 2025",
        "notificationDate": "Jan 19, 2026",
        "location": "San Francisco, CA",
        "link": "https://sp2026.ieee-security.org/cfpapers.html"
    }
];

// Function to parse date string and return Date object
function parseDate(conference) {
    return new Date(conference.submissionDeadline);
}

// Function to load conference data into the HTML table
function loadConferenceData() {
    // Sort the list in ascending order by submission deadline
    conferenceData.sort((a, b) => parseDate(a) - parseDate(b));

    const tableBody = document.getElementById('conference-table-body');
    conferenceData.forEach(data => {
        const row = document.createElement('tr');

        const deadline = parseDate(data);
        const now = new Date();
        if (deadline < now) {
            row.style.textDecoration = 'line-through';
        }

        row.innerHTML = `
            <td><a href=${data.link}>${data.conference}</a></td>
            <td>${data.cycle}</td>
            <td>${data.submissionDeadline}</td>
            <td>${data.location}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Load data when the document is fully loaded
document.addEventListener('DOMContentLoaded', loadConferenceData);
