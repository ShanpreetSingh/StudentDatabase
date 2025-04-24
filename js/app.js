// Database Configuration
const dbConfig = {
    dbName: "SCHOOL-DB",
    relationName: "STUDENT-TABLE",
    baseUrl: "http://api.login2explore.com:5577",
    token: "90934770|-31949209020953374|90956020" 
};

// Mock Data Configuration
const config = {
    useMockData: false,      // Set to false to use real API
    mockDelay: 500,         
    mockStudents: {         
        "1001": {
            "Roll-No": "1001",
            "Full-Name": "John Doe",
            "Class": "10A",
            "Birth-Date": "2005-05-15",
            "Address": "123 Main St",
            "Enrollment-Date": "2023-06-01"
        }
    }
};

// DOM Elements
const form = document.getElementById('studentForm');
const rollNoInput = document.getElementById('rollNo');
const fullNameInput = document.getElementById('fullName');
const classInput = document.getElementById('class');
const birthDateInput = document.getElementById('birthDate');
const addressInput = document.getElementById('address');
const enrollmentDateInput = document.getElementById('enrollmentDate');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const resetBtn = document.getElementById('resetBtn');

// Initialize Form
function initForm() {
    initMockStorage();
    resetForm();
    attachEventListeners();
}

// Initialize Mock Data Storage
function initMockStorage() {
    if (!config.useMockData) return;
    
    if (!localStorage.getItem('mockStudents')) {
        localStorage.setItem('mockStudents', JSON.stringify(config.mockStudents));
    }
}

// Reset Form to Initial State
function resetForm() {
    form.reset();
    disableAllFields();
    rollNoInput.disabled = false;
    rollNoInput.focus();
    saveBtn.disabled = true;
    updateBtn.disabled = true;
    resetBtn.disabled = true;
}

// Disable All Form Fields
function disableAllFields() {
    fullNameInput.disabled = true;
    classInput.disabled = true;
    birthDateInput.disabled = true;
    addressInput.disabled = true;
    enrollmentDateInput.disabled = true;
}

// Enable All Form Fields
function enableFormFields() {
    fullNameInput.disabled = false;
    classInput.disabled = false;
    birthDateInput.disabled = false;
    addressInput.disabled = false;
    enrollmentDateInput.disabled = false;
}

// Validate Form Fields
function validateForm() {
    const isValid = rollNoInput.value.trim() !== '' &&
                   fullNameInput.value.trim() !== '' &&
                   classInput.value.trim() !== '' &&
                   birthDateInput.value !== '' &&
                   addressInput.value.trim() !== '' &&
                   enrollmentDateInput.value !== '';
    
    if (!isValid) {
        alert("All fields are required!");
    }
    return isValid;
}

// Update Button States
function updateButtonStates() {
    const isValid = validateForm();
    resetBtn.disabled = !isValid;
}


async function mockCheckStudentExists(rollNo) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = JSON.parse(localStorage.getItem('mockStudents')) || {};
            resolve(mockData.hasOwnProperty(rollNo));
        }, config.mockDelay);
    });
}

async function mockGetStudentData(rollNo) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = JSON.parse(localStorage.getItem('mockStudents')) || {};
            resolve(mockData[rollNo] || null);
        }, config.mockDelay);
    });
}

async function mockSaveStudentData(studentData) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = JSON.parse(localStorage.getItem('mockStudents')) || {};
            mockData[studentData["Roll-No"]] = studentData;
            localStorage.setItem('mockStudents', JSON.stringify(mockData));
            resolve(true);
        }, config.mockDelay);
    });
}

async function mockUpdateStudentData(rollNo, studentData) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = JSON.parse(localStorage.getItem('mockStudents')) || {};
            mockData[rollNo] = studentData;
            localStorage.setItem('mockStudents', JSON.stringify(mockData));
            resolve(true);
        }, config.mockDelay);
    });
}

//REAL API HANDLERS

async function apiCheckStudentExists(rollNo) {
    try {
        const response = await fetch(`${dbConfig.baseUrl}/api/irl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': dbConfig.token
            },
            body: JSON.stringify({
                "dbName": dbConfig.dbName,
                "relationName": dbConfig.relationName,
                "record": { "Roll-No": rollNo }
            })
        });
        const data = await response.json();
        return data.data && data.data.length > 0;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

async function apiGetStudentData(rollNo) {
    try {
        const response = await fetch(`${dbConfig.baseUrl}/api/irl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': dbConfig.token
            },
            body: JSON.stringify({
                "dbName": dbConfig.dbName,
                "relationName": dbConfig.relationName,
                "record": { "Roll-No": rollNo }
            })
        });
        const data = await response.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

async function apiSaveStudentData(studentData) {
    try {
        const response = await fetch(`${dbConfig.baseUrl}/api/iml`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': dbConfig.token
            },
            body: JSON.stringify({
                "dbName": dbConfig.dbName,
                "relationName": dbConfig.relationName,
                "record": studentData
            })
        });
        const data = await response.json();
        return data.status === 200;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

async function apiUpdateStudentData(rollNo, studentData) {
    try {
        const response = await fetch(`${dbConfig.baseUrl}/api/irl/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': dbConfig.token
            },
            body: JSON.stringify({
                "dbName": dbConfig.dbName,
                "relationName": dbConfig.relationName,
                "record": studentData,
                "match": { "Roll-No": rollNo }
            })
        });
        const data = await response.json();
        return data.status === 200;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}



async function checkStudentExists(rollNo) {
    try {
        const exists = config.useMockData 
            ? await mockCheckStudentExists(rollNo)
            : await apiCheckStudentExists(rollNo);
        
        return exists;
    } catch (error) {
        console.error("Error checking student:", error);
        alert("Error checking student. Using mock data fallback.");
        config.useMockData = true;
        return mockCheckStudentExists(rollNo);
    }
}

async function getStudentData(rollNo) {
    try {
        return config.useMockData
            ? await mockGetStudentData(rollNo)
            : await apiGetStudentData(rollNo);
    } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error fetching data. Using mock data fallback.");
        config.useMockData = true;
        return mockGetStudentData(rollNo);
    }
}

async function saveStudentData(studentData) {
    try {
        const success = config.useMockData
            ? await mockSaveStudentData(studentData)
            : await apiSaveStudentData(studentData);
        
        if (success) {
            alert(config.useMockData
                ? "Saved to mock storage!"
                : "Student saved successfully!");
        }
        return success;
    } catch (error) {
        console.error("Error saving student:", error);
        alert("Error saving data. Using mock data fallback.");
        config.useMockData = true;
        return mockSaveStudentData(studentData);
    }
}

async function updateStudentData(rollNo, studentData) {
    try {
        const success = config.useMockData
            ? await mockUpdateStudentData(rollNo, studentData)
            : await apiUpdateStudentData(rollNo, studentData);
        
        if (success) {
            alert(config.useMockData
                ? "Updated in mock storage!"
                : "Student updated successfully!");
        }
        return success;
    } catch (error) {
        console.error("Error updating student:", error);
        alert("Error updating data. Using mock data fallback.");
        config.useMockData = true;
        return mockUpdateStudentData(rollNo, studentData);
    }
}

// Handle Roll No Field Blur Event
async function handleRollNoBlur() {
    const rollNo = rollNoInput.value.trim();
    if (rollNo === '') return;
    
    try {
        const exists = await checkStudentExists(rollNo);
        
        if (exists) {
            const studentData = await getStudentData(rollNo);
            if (studentData) {
                fullNameInput.value = studentData["Full-Name"] || '';
                classInput.value = studentData["Class"] || '';
                birthDateInput.value = studentData["Birth-Date"] || '';
                addressInput.value = studentData["Address"] || '';
                enrollmentDateInput.value = studentData["Enrollment-Date"] || '';
                
                rollNoInput.disabled = true;
                enableFormFields();
                fullNameInput.focus();
                updateBtn.disabled = false;
                resetBtn.disabled = false;
                saveBtn.disabled = true;
            }
        } else {
            enableFormFields();
            fullNameInput.focus();
            saveBtn.disabled = false;
            resetBtn.disabled = false;
            updateBtn.disabled = true;
        }
    } catch (error) {
        console.error("RollNo blur error:", error);
    }
}

// Handle Save Button Click
async function handleSave() {
    if (!validateForm()) return;
    
    const studentData = {
        "Roll-No": rollNoInput.value.trim(),
        "Full-Name": fullNameInput.value.trim(),
        "Class": classInput.value.trim(),
        "Birth-Date": birthDateInput.value,
        "Address": addressInput.value.trim(),
        "Enrollment-Date": enrollmentDateInput.value
    };
    
    const success = await saveStudentData(studentData);
    if (success) {
        resetForm();
    }
}

// Handle Update Button Click
async function handleUpdate() {
    if (!validateForm()) return;
    
    const rollNo = rollNoInput.value.trim();
    const studentData = {
        "Roll-No": rollNo,
        "Full-Name": fullNameInput.value.trim(),
        "Class": classInput.value.trim(),
        "Birth-Date": birthDateInput.value,
        "Address": addressInput.value.trim(),
        "Enrollment-Date": enrollmentDateInput.value
    };
    
    const success = await updateStudentData(rollNo, studentData);
    if (success) {
        resetForm();
    }
}

// Attach Event Listeners
function attachEventListeners() {
    rollNoInput.addEventListener('blur', handleRollNoBlur);
    
    [fullNameInput, classInput, birthDateInput, addressInput, enrollmentDateInput].forEach(input => {
        input.addEventListener('input', updateButtonStates);
    });
    
    saveBtn.addEventListener('click', handleSave);
    updateBtn.addEventListener('click', handleUpdate);
    resetBtn.addEventListener('click', resetForm);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initForm);