const generateSessionId = () => {
    // Define characters that can be used in the session ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sessionId = '';
    const length = 20; // You can adjust the length of the session ID as needed
    // Loop through the characters to generate the random session ID
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        sessionId += characters.charAt(randomIndex);
    }
    return sessionId;
};
module.exports=generateSessionId