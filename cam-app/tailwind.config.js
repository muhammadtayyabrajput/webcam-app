const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/components/layout/layout.js", "./src/components/auth/login.js", "./src/components/auth/register.js", "./src/components/media/MediaDisplay.js", "./src/components/profile/profile.js", "./src/components/webcam/WebCamCapture.js"],
    theme: {
        extend: {},

    },
    plugins: [],
});