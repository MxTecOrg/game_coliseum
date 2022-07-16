function register(username, email, password, rpassword) {

    const spam = new Spam();

    server.post("/auth/register", {
        username: username,
        email: email,
        password: password,
        rpassword: rpassword
    }, (data, response) => {
        if (response === 200) {
            data = JSON.parse(data);
            spam.alert({
                title: null,
                text: data.data,
                action: () => { if (data.status) window.location.href = "/auth/login"; }
            });
        } else {
            spam.alert({
                title: "Error:",
                text: "Internal error...",
                action: () => { return null }
            });
        }
    });
}
