// File: /el-barquillo-app/el-barquillo-app/js/users.js

const usersData = JSON.parse(localStorage.getItem("users") || "[]");

export function getUsers() {
    return usersData.filter(user => user.username !== "admin");
}

export function addUser(user) {
    usersData.push(user);
    localStorage.setItem("users", JSON.stringify(usersData));
}

export function editUser(index, updatedUser) {
    usersData[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(usersData));
}

export function deleteUser(index) {
    usersData.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(usersData));
}

export function getUserAccessLogs(username) {
    const user = usersData.find(user => user.username === username);
    return user ? user.accessLogs : [];
}

export function addAccessLog(username, date) {
    const user = usersData.find(user => user.username === username);
    if (user) {
        user.accessLogs = user.accessLogs || [];
        user.accessLogs.push(date);
        localStorage.setItem("users", JSON.stringify(usersData));
    }
}