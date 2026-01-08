// input
const titleEl = document.getElementById("title");
const summaryEl = document.getElementById("summary");
const contentEl = document.getElementById("content");
// btn
const previewbtnEl = document.getElementById("preview");
// preview
const previewTitleEl = document.getElementById("preview-title");
const previewSummaryEl = document.getElementById("preview-summary");
const previewContentEl = document.getElementById("preview-content");
// characters handeling max
const titleMax = 60;
const summaryMax = 160;
// content min
const contentMinWords = 250;
const contentWarning = document.getElementById("recommend-content");

// characters handeling spans
const titleRemainingEl = document.getElementById("title-remaining");
const summaryRemainingEl = document.getElementById("summary-remaining");
const contentRemainingEl = document.getElementById("content-remaining");
// error output
const errorEl = document.getElementById("content-status");

const previewHandler = () => {
  const titleContent = titleEl.value;
  const summaryContent = summaryEl.value;
  const contentContent = contentEl.value;

  if (validateMaxLength()) {
    previewTitleEl.textContent = titleContent;
    previewSummaryEl.textContent = summaryContent;
    previewContentEl.textContent = contentContent;

    errorEl.textContent = " completed , please check the preview";
    errorEl.className = " alert alert-success text-center text-success";
  } else {
    errorEl.textContent =
      " title or summary is not valid, please check it again.";

    errorEl.className = " alert alert-danger text-center text-danger";
  }

  console.log({
    title: titleEl.value.length,
    summary: summaryEl.value.length,
    content: contentEl.value.length,
  });
};

const validateMaxLength = () => {
  const titleContentLength = titleEl.value.length;
  const summaryContentLength = summaryEl.value.length;
  if (titleContentLength > titleMax || summaryContentLength > summaryMax) {
    console.log("title or summary wrong");
    return false;
  } else return true;
};
const validateMinContent = () => {
  const contentLength = wordCounter();
  if (contentLength < contentMinWords) {
    return false;
  } else return true;
};

const updateCounters = () => {
  titleRemainingEl.textContent = titleMax - +titleEl.value.length;
  summaryRemainingEl.textContent = summaryMax - +summaryEl.value.length;
  contentRemainingEl.textContent = contentMinWords - wordCounter();
  realtimecolorvalidation();
};

const wordCounter = () => {
  return contentEl.value.trim().split(/\s+/).length;
};

const realtimecolorvalidation = () => {
  // content ux counter colors
  if (validateMinContent()) {
    contentWarning.className = "text-success ";
    contentWarning.textContent = "content length is perfect!";
  } else {
    contentWarning.className = " text-warning  ";
    contentWarning.textContent = "you'd better make your content stronger.";
  }
  const titlevalidation = titleMax + titleEl.value.length;

  // title ux counter colors
  if (titlevalidation <= 0) {
    titleRemainingEl.className = "text-danger";
  } else if (titlevalidation > 0 && titlevalidation <= 10) {
    titleRemainingEl.className = "text-warning";
  }

  // summary ux counter colors
  if (summaryMax - +summaryEl.value.length === 160) {
    summaryRemainingEl.className = "text-warning";
  } else if (summaryMax - +summaryEl.value.length > 140) {
    summaryRemainingEl.className = "text-warning";
  } else if (summaryMax - +summaryEl.value.length < 20) {
    titleRemainingEl.className = "text-warning";
  } else if (summaryMax - +summaryEl.value.length < 0) {
    summaryRemainingEl.className = "text-danger";
  }
};

previewbtnEl.addEventListener("click", previewHandler);
titleEl.addEventListener("input", updateCounters);
summaryEl.addEventListener("input", updateCounters);
contentEl.addEventListener("input", updateCounters);
