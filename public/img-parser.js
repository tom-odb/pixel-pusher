(function () {
    const panelSize = 18;
    const pixelSize = 10;
    const panelsX = 3;
    const panelsY = 2;


    function render(panels) {
        const canvas = document.getElementById("canvas");
        canvas.style.width = `${panelSize * pixelSize * panelsX}px`;
        canvas.style.height = `${panelSize * pixelSize * panelsY}px`;

        panels.forEach((panelData, panelNumber) => {
            const panel = document.createElement("div");
            panel.classList.add("panel");
            panel.setAttribute("id", panelNumber);
            panel.style.width = `${panelSize * pixelSize}px`;
            panel.style.height = `${panelSize * pixelSize}px`;

            panelData.forEach((lineData, lineNumber) => {
                const line = document.createElement("div");
                line.classList.add("line");
                line.setAttribute("id", lineNumber);
                line.style.width = `${panelSize * pixelSize}px`;
                line.style.height = `${pixelSize}px`;

                lineData.forEach((pixelData, index) => {
                    const pixel = document.createElement("div");
                    pixel.classList.add("pixel");
                    pixel.style.backgroundColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${Math.round(pixelData[3] / 255 * 100) / 100})`;
                    pixel.setAttribute("id", index * lineNumber);
                    pixel.style.width = `${pixelSize}px`;
                    pixel.style.height = `${pixelSize}px`;

                    line.appendChild(pixel);
                });

                panel.appendChild(line);
            });

            canvas.appendChild(panel);
        });
    }

    function fetchImg(img) {
        const query = img ? `?img=${encodeURIComponent(img)}` : "";
        return fetch(`/img${query}`).then(response => response.json())
    }

    function renderImg(img) {
        const canvas = document.getElementById("canvas");

        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }

        fetchImg(img).then(pixels => render(pixels));
    }

    function bindEventListeners() {
        const btn = document.getElementById("btn");
        const img = document.getElementById("imagePicker");

        btn.addEventListener("click", e => {
            renderImg(img.value);
        });
    }

    function init() {
        const img = document.getElementById("imagePicker");

        bindEventListeners();

        renderImg(img.value);
    }

    init();
})();
