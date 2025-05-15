
#  STUDENT ENROLLMENT SYSTEM WITH JSONPowerDB


A responsive web-based student enrollment system that enables users to perform full CRUD (Create, Read, Update, Delete) operations seamlessly using JSONPowerDB, a high-performance NoSQL database. This project showcases integration with a NoSQL backend for dynamic form handling and persistent data storage.



## Table Of Contents
1. Description
2. Key Features
3. Benefits of Using JsonPowerDb
4. Release History
5. Getting Started
6. Installation
7. Illustrations
8. Scope of Functionalities
9. Example of Use
10. Usage
11. Project Status
12. Troubleshooting
13. Sources
## Key Features
- Create, Read, Update student records
- Form validation
- Responsive design
- Dual-mode operation (API + mock data)
- Automatic API health detection
##  Benefits of using JSON PowerDB

- Lightweight: Requires minimal setup
- Schema-less: Flexible data structure
- High Performance: Fast read/write operations
- Real-time: Immediate data persistence
- Secure: Token-based authentication
## Release History
| Version | Date       | Description                     |
|---------|------------|---------------------------------|
| v1.0    | 2025-04-24 | Initial release with basic CRUD |
| v1.1    | 2025-04-25 | Added mock data fallback        |

# Prerequisites
- Web browser (Chrome/Firefox recommended)
- Internet connection (for API mode)
- JSONPowerDB account (for token)
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ShanpreetSingh/StudentDatabase
   Open index.html in a browser

## Illustrations
1) ![image](https://github.com/user-attachments/assets/f1634861-3544-435b-abd7-ef39285c5458) (Screenshot of Student Form)
2) ![image](https://github.com/user-attachments/assets/4516578e-463c-4402-a1d5-158924eefcf5)  (Screenshot of DataBase)

## Scope of Functionalities
| Feature                | Status |
|------------------------|--------|
| Create student records | ✅     |
| Read student data      | ✅     |
| Update information     | ✅     |
| Form validation        | ✅     |
| Offline mock mode      | ✅     |
## Example of Use
1. Adding a New Student:
```javascript
{
  "Roll-No": "1002",
  "Full-Name": "Priya Sharma",
  "Class": "11B",
  "Birth-Date": "2006-03-12",
  "Address": "456 Oak Avenue",
  "Enrollment-Date": "2023-07-01"
}
```

## Usage
Online Mode (Default)

1.Set useMockData: false in js/app.js

2.Ensure internet connectivity

Offline Mode

1.Set useMockData: true

2.Data persists in browser storage
## Project Status
Active Development

Current focus: Adding bulk import/export functionality
## Troubleshooting
CORS Issues

If you see CORS errors:
Install a CORS browser extension temporarily

Token Problems

Verify token in JSONPowerDB dashboard
Regenerate if expired
## Sources

 - [JSON PowerDB Documentation](https://login2explore.com/)
 - [JPDB API Docs](https://login2explore.com/jpdb/docs.html)



## Troubleshooting
CORS Issues

If you see CORS errors:
Install a CORS browser extension temporarily

Token Problems

Verify token in JSONPowerDB dashboard
Regenerate if expired
## 
Developed By : Shanpreet Singh
