function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

export function getCurrentUser() {
    const id = localStorage.getItem("currentUserId");

    const users = getUsers();

    return users.find(function(user) {
        return user.id === id;
    }) || null;
}

export function registerUser(username, password) {
    username = username.trim().toLowerCase();

    if (username.length < 3) {
        throw new Error("Логин должен содержать минимум 3 символа");
    }

    if (password.length < 6) {
        throw new Error("Пароль должен содержать минимум 6 символов");
    }

    const users = getUsers();

    const existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        throw new Error("Такой логин уже занят");
    }

    // Учебный пример: только выдуманные пароли!
    const user = {
        id: crypto.randomUUID(),
        username: username,
        password: password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    // После регистрации сразу входим.
    localStorage.setItem("currentUserId", user.id);
}

export function loginUser(username, password) {
    username = username.trim().toLowerCase();

    const users = getUsers();

    const user = users.find(function(user) {
        return user.username === username &&
            user.password === password;
    });

    if (!user) {
        throw new Error("Неверный логин или пароль");
    }

    localStorage.setItem("currentUserId", user.id);
}

export function logoutUser() {
    localStorage.removeItem("currentUserId");
}