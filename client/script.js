let x = "";
//------------------------------------------------------------------------------------------
$(document).ready(function () {
    $(".section").hide();
    $(".logout").hide();

    $(".closeWindow").click(function () {
        $(".loginPage").hide();
        $(".signUpPage").hide();
    });
    //------------------------------------------------------------------------------------------
    $(".login").click(function () {
        $(".loginPage").show();
    });

    $(".closeLogin").click(function () {
        fetchUserInfo();
    });

    function fetchUserInfo() {
        const userData = {
            username: $(".loginUsername").val(),
            password: $(".loginPassword").val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/ball-tracker/getUserInfo',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(userData),
            success: function (data) {
                confirmLogin(data);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching user info:', error);
            }
        });
    }
    function confirmLogin(user) {
        if (user.message === "200") {
            x = user.username;
            alert("Login Successful!")
            $(".loginPage").hide();
            $(".login").hide();
            $(".signUp").hide();
            $(".noteClass").hide();

            $(".section").show();
            $(".logout").show();
        } else {
            alert(user.message + ": User not Found!");
        }
    }
    //------------------------------------------------------------------------------------------
    $(".signUp").click(function () {
        $(".signUpPage").show();
    });

    $(".closeSignUp").click(function () {
        alert("SignUp Successful!")

        $(".signUpPage").hide();
        $(".login").hide();
        $(".signUp").hide();
        $(".noteClass").hide();

        $(".section").show();
        $(".logout").show();
    });
    //------------------------------------------------------------------------------------------
    $(".logout").click(function () {
        alert("User Logged Out Successfully!")
        $(".section").hide();
        $(".logout").hide();

        $(".login").show();
        $(".signUp").show();
        $(".noteClass").show();
    });
});
