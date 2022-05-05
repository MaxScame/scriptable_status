// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heartbeat;
/*
 * Author: MaxScame
 * Github: https://github.com/MaxScame
 */
const params = args.widgetParameter ? args.widgetParameter.split(",") : [];

const isDarkTheme = params?.[0] === 'dark';
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
    widget.backgroundColor = new Color('#1C1C1E');
}
widget.setPadding(padding, padding, padding, padding);

widget.url = 'https://www.coingecko.com/en/coins/rubic';

const headerStack = widget.addStack();
headerStack.setPadding(0, 0, 15, 0);
const headerText = headerStack.addText("InScience");
headerText.font = Font.mediumSystemFont(16);
if (isDarkTheme) {
    headerText.textColor = new Color('#FFFFFF');
}

async function buildWidget() {
    const inScienceImage = await loadImage('https://inscience.kovalev.team/img/logo.2764c254.svg');

    const InScienceStatus = await getStatusInfo('inscience');

    addStatus(inScienceImage, 'Status:', `${InScienceStatus}`);
}

function addStatus(image, name, status) {
    const rowStack = widget.addStack();
    rowStack.setPadding(0, 0, 14, 0);
    rowStack.layoutHorizontally();

    const imageStack = rowStack.addStack();
    const symbolStack = rowStack.addStack();
    const priceStack = rowStack.addStack();

    imageStack.setPadding(0, 0, 0, 10);
    priceStack.setPadding(0, 8, 0, 0);

    const imageNode = imageStack.addImage(image);
    imageNode.imageSize = new Size(20, 20);
    imageNode.leftAlignImage();

    const symbolText = symbolStack.addText(name);
    symbolText.font = Font.mediumSystemFont(16);

    const statusText = priceStack.addText(status);
    statusText.font = Font.mediumSystemFont(16);

    if (isDarkTheme) {
        symbolText.textColor = new Color('#FFFFFF');
    }

    if (status === 200) {
        statusText.textColor = new Color('#4AA956');
    } else {
        statusText.textColor = new Color('#D22E2E');
    }
}

async function getStatusInfo(projectSubUrl) {
    const url = `https://${projectSubUrl}.kovalev.team/`;
    const req = new Request(url);
    const status = await req.response().statusCode;
    return { 'status': status };
}

async function loadImage(imgUrl) {
    const req = new Request(imgUrl)
    return await req.loadImage()
}

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
