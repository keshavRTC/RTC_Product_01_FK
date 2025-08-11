


import fs from 'fs';
import path from 'path';



export class JsonLocatorReader {
  public data: any;


  constructor(filePath: string) {

    const absolutePath = path.resolve(__dirname, filePath);
    const jsonData = fs.readFileSync(absolutePath, 'utf-8');
    // Parse the JSON string into a JavaScript object
    this.data = JSON.parse(jsonData);

  }


  getHeaders(): any {
    return this.data.headers;
  }


  getProperty(key: string): any {
    if (this.data && typeof this.data === 'object' && this.data.hasOwnProperty(key)) {
      return this.data[key];
    }
    console.warn(`Property '${key}' not found in the loaded JSON data.`);
    return undefined;
  }


  // for industry specific headers
}

// console.log("hey buddy -->", reader.data.headers.services.submenu.devopsSolution.text); // Access the headers property
// console.log("hey buddy -->", reader.data.headers.services.submenu.devopsSolution.hrefSlug); // Access the headers property


