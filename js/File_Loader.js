// File_loader.js

// load depth file
let bathy2D = null;
export async function loadDepthSurface(filePath,calc_constants) {
    // Fetch the file content
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch depth surface file: ${response.statusText}`);
    }
    const fileContent = await response.text();

    // Split content into lines while considering different newline formats
    const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);

    // Split each line by any space and parse it to a 2D array
    const bathy2D = lines.map(line => {
        // Splitting by any sequence of space characters
        return line.split(/\s+/).filter(val => val).map(Number);
    });

    let rows = bathy2D.length;
    let columns = bathy2D[0].length;

    if (rows !== calc_constants.HEIGHT || columns !== calc_constants.WIDTH) {
        console.log("Number of rows in bathy file:", rows);
        console.log("Number of columns in bathy file:", columns);
        console.log("HEIGHT:", calc_constants.HEIGHT);
        console.log("WIDTH:", calc_constants.WIDTH);
        throw new Error(`Dimensions of loaded bathy file do not match specified WIDTH and HEIGHT`);
    }
    {
        console.log("Bathymetry loaded successfully.");
    }

    // correct edges
    for (let y = 0; y < calc_constants.HEIGHT; y++) {
        for (let x = 0; x < 2; x++) {
            bathy2D[x][y] = bathy2D[4 - x][y];
        }
    }
    for (let y = 0; y < calc_constants.HEIGHT; y++) {
        for (let x = calc_constants.WIDTH - 2; x < calc_constants.WIDTH; x++) {
            bathy2D[x][y] = bathy2D[2 * (calc_constants.WIDTH - 3) - x][y];
        }
    }
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < calc_constants.WIDTH; x++) {
            bathy2D[x][y] = bathy2D[x][4 - y];
        }
    }
    for (let y = calc_constants.HEIGHT - 2; y < calc_constants.HEIGHT; y++) {
        for (let x = 0; x < calc_constants.WIDTH; x++) {
            bathy2D[x][y] = bathy2D[x][2 * (calc_constants.HEIGHT - 3) - y];
        }
    }

    return bathy2D
}

// load wave data
export async function loadWaveData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const text = await response.text();
        const lines = text.trim().split("\n");
        const numberOfWaves = parseInt(lines[0].split(' ')[1], 10);

        const waveData = lines.slice(2).map(line => line.trim().split(/\s+/).map(Number));

        console.log("Wave data loaded successfully.");
        return { numberOfWaves, waveData };

    } catch (error) {
        console.error("Error reading the irrWaves.txt file: ", error);
        throw error;  // Propagate the error so the calling function can handle it.
    }
}



