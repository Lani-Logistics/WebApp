const welcomeEmailTemplate = (name: string, dashboardLink: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lani Logistics</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            }
            h1 {
                color: #222;
            }
            p {
                color: #444;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                padding: 10px 18px;
                margin-top: 15px;
                background-color: #0073e6;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
            .small-text {
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ${name},</h1>
            <p>Welcome to Lani Logistics. Your account has been successfully created.</p>
            <p>You can access your dashboard here:</p>
            <a href="${dashboardLink}" class="button">Open Dashboard</a>
            
            <p>If the button doesn’t work, copy and paste this link into your browser:</p>
            <p class="small-text">${dashboardLink}</p>

            <div class="footer">
                <p>If you have any questions, visit our <a href="https://lanilogistics.com/support">Support Page</a>.</p>
                <p>Lani Logistics Team</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export { welcomeEmailTemplate };
