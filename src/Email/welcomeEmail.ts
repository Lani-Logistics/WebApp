const welcomeEmailTemplate = (name: string, dashboardLink: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lani Logistics!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #fa781d;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome, ${name}!</h1>
            <p>We're excited to have you at Lani Logistics.</p>
            <p>Our trusted logistics solutions help you send and receive packages effortlessly. Whether it's local deliveries or time-sensitive shipments, we've got you covered.</p>

            <p>To get started, access your dashboard below:</p>
            <a href="${dashboardLink}" class="button">Go to Dashboard</a>

            <p>Need any help? Our support team is here anytime.</p>

            <div class="footer">
                <p>Best regards,<br>Lani Logistics Team</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export { welcomeEmailTemplate };
