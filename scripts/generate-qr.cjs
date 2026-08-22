const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const siteData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "site.json"), "utf8")
);
const appUrl = process.env.NEXT_PUBLIC_APP_URL || siteData.appUrl;

if (!appUrl || !/^https?:\/\//i.test(appUrl)) {
  throw new Error(
    "A valid URL is required. Set NEXT_PUBLIC_APP_URL or update data/site.json."
  );
}

const outputDir = path.join(__dirname, "..", "public", "qr");
fs.mkdirSync(outputDir, { recursive: true });

Promise.all([
  QRCode.toFile(path.join(outputDir, "install-qr.png"), appUrl, {
    width: 1200,
    margin: 3,
    errorCorrectionLevel: "H",
    color: { dark: "#17110f", light: "#ffffff" },
  }),
  QRCode.toFile(path.join(outputDir, "install-qr.svg"), appUrl, {
    type: "svg",
    margin: 3,
    errorCorrectionLevel: "H",
    color: { dark: "#17110f", light: "#ffffff" },
  }),
]).then(() => {
  fs.writeFileSync(
    path.join(outputDir, "README.txt"),
    [
      "Wrap & Roll PWA Install QR",
      "",
      `This QR opens: ${appUrl}`,
      "",
      "After deploying to a different domain, regenerate:",
      "NEXT_PUBLIC_APP_URL=https://your-domain.com npm run generate:qr",
      "",
      "Android: open the link and tap Download & Install App.",
      "iPhone: open the link in Safari, then Share > Add to Home Screen.",
    ].join("\n")
  );
  console.log(`QR generated for ${appUrl}`);
});