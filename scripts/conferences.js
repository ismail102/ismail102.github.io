// JavaScript for dynamically loading the conference data

// Sample JSON data
const conferenceData = [
    {
        "conference": "PoPETS",
        "cycle": "4",
        "submissionDeadline": "Feb 28, 2025",
        "notificationDate": "May 15, 2025",
        "location": "Washington DC, USA/Virtual",
        "link": "https://petsymposium.org/cfp25.php"
    },
    {
        "conference": "ACM CCS",
        "cycle": "2",
        "submissionDeadline": "Apr 07, 2025",
        "notificationDate": "August 10, 2025",
        "location": "Taipei, Taiwan",
        "link": "https://www.sigsac.org/ccs/CCS2025/call-for-papers/"
    },
    {
        "conference": "ASONAM 2025",
        "cycle": "NA",
        "submissionDeadline": "Apr 20, 2025",
        "notificationDate": "June 10, 2025",
        "location": "Ontario, Canada",
        "link": "https://asonam.cpsc.ucalgary.ca/2025/CFP.php"
    },
     {
        "conference": "NeurIPS 2025",
        "cycle": "NA",
        "submissionDeadline": "May 15, 2025",
        "notificationDate": "Sep 18, 2025",
        "location": "San Diego, United States",
        "link": "https://asonam.cpsc.ucalgary.ca/2025/CFP.php"
    },
    {
        "conference": "IEEE S&P",
        "cycle": "1",
        "submissionDeadline": "Jun 05, 2025",
        "notificationDate": "August 10, 2025",
        "location": "San Francisco, CA",
        "link": "https://sp2026.ieee-security.org/cfpapers.html"
    },
    {
        "conference": "ICWSM",
        "cycle": "1",
        "submissionDeadline": "TBD",
        "notificationDate": "August 10, 2025",
        "location": "California, USA",
        "link": "https://www.sigsac.org/ccs/CCS2025/call-for-papers/"
    },
    {
        "conference": "USENIX",
        "cycle": "1",
        "submissionDeadline": "Sep 04, 2025",
        "notificationDate": "",
        "location": "Baltimore, MD, USA",
        "link": "https://www.usenix.org/conference/usenixsecurity26"
    },
    {
        "conference": "IEEE S&P",
        "cycle": "2",
        "submissionDeadline": "Nov 13, 2025",
        "notificationDate": "August 10, 2025",
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
