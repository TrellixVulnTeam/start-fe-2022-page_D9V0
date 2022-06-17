// loadJson.js
async function loadJson(json) {
    // console.log("-----LOADJSON-----");
    const response = await fetch(json);
    const result = await response.json();
    // console.log("----------");
    return result;
}

export default {loadJson};