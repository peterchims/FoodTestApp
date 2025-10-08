import cron from "cron";
import https from "https";

const job = new cron.CronJob(
    "*/14 * * * *", // Added the 5th field: minute hour day month dayOfWeek
    function () {
        console.log('🕒 Sending keep-alive request at:', new Date().toLocaleString());
        https
            .get(process.env.API_URL, (res) => {
                if (res.statusCode === 200) {
                    console.log("✅ GET request sent successfully");
                } else {
                    console.log("❌ GET request failed", res.statusCode);
                }
            })
            .on("error", (e) => console.error("Error while sending request", e));
    },
    null, // onComplete
    true, // start
    'UTC' // timezone
);

console.log('🚀 Keep-alive cron job started - running every 14 minutes');
export default job;