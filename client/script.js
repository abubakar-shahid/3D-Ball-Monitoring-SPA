$(document).ready(function () {
    $(".section").hide();
    $(".logout").hide();

    $(".closeWindow").click(function () {
        $(".loginPage").hide();
        $(".signUpPage").hide();
    });

    $(".login").click(function () {
        $(".loginPage").show();
    });

    $(".closeLogin").click(function () {
        alert("Login Successful!")
        $(".loginPage").hide();
        $(".login").hide();
        $(".signUp").hide();
        $(".noteClass").hide();

        $(".section").show();
        $(".logout").show();
    });

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

    $(".logout").click(function () {
        alert("User Logged Out Successfully!")
        $(".section").hide();
        $(".logout").hide();

        $(".login").show();
        $(".signUp").show();
        $(".noteClass").show();
    });
});
