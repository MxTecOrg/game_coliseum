function login(email, password) {

    const spam = new Spam();

    server.post("/auth/login", {
        email: email,
        password: password,
    }, (data, response) => {
        if (response === 200) {
            data = JSON.parse(data);
            if (!data.status) {
                spam.alert({
                    title: null,
                    text: data.data,
                    action: () => { return null; }
                });
            } else {
                app.save_data("token" , data.data)
                window.location.href = "/game";
            }
        } else {
            spam.alert({
                title: "Error:",
                text: "Error...",
                action: () => { return null; }
            });
        }
    });
}
