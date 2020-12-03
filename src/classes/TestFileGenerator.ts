import { getRandomID, getRandomInt } from '../util/util';
import Jimp from 'jimp';
import fs from 'fs';
import omggif from 'omggif';

enum FileType {
  jpeg = 'jpeg',
  cvs = 'cvs',
  txt = 'txt',
  gif = 'gif',
}

export class TestFileGenerator {
  private name: string;
  private location: string;
  private size: number;
  private type: string;
  private clean: boolean;
  private completeLocation: string;
  private created: string[] = Array();
  private sizeX: number = 100;
  private sizeY: number = 100;

  constructor(type: string, clean?: boolean) {
    this.setType(type);
    this.setLocation();
    this.setSize();
    this.clean = clean;
  }

  generateFile(): boolean {
    this.setName(name);
    this.created.push(this.completeLocation);

    switch (this.type) {
      case FileType.cvs: {
        return this.generateCVS();
      }

      case FileType.jpeg: {
        return this.generateJPEG();
      }

      case FileType.txt: {
        return this.generateTXT();
      }

      case FileType.gif: {
        return this.generateGIF();
      }
    }

    return false;
  }

  private generateTXT() {
    let data: string = '';

    while (this.getMemorySize(data) < this.size) {
      data = data + getRandomID();
    }

    return this.writeFile(data);
  }

  private generateCVS(): boolean {
    let data: string = '1, 2, 3, 4 \n';

    while (this.getMemorySize(data) < this.size) {
      data = data + getRandomID() + ',' + getRandomID() + ',' + getRandomID() + ',' + getRandomID() + '\n';
    }

    return this.writeFile(data);
  }

  private generateJPEG(): boolean {
    const image: Jimp = this.getRandomJimpImage();

    image
      .writeAsync(this.completeLocation)
      .then(() => {
        if (this.clean) {
          fs.unlinkSync(this.completeLocation);
        }
      })
      .catch((error: any) => {
        throw error;
      });
    return true;
  }

  private getRandomJimpImage(): Jimp {
    const image: Jimp = new Jimp(this.sizeX, this.sizeY, 'white', (err, data) => {
      if (err) {
        throw err;
      }
      return data;
    });

    for (let x = 0; x < this.sizeX; x++) {
      for (let y = 0; y < this.sizeY; y++) {
        image.setPixelColor(
          Jimp.rgbaToInt(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)),
          x,
          y,
        );
      }
    }

    return image;
  }
  private generateGIF(): boolean {
    if (this.sizeX < 100 || this.sizeY < 100) {
      throw new Error('size shold be at least 100x100');
    }

    const size = this.sizeX * this.sizeY;
    const buf = Buffer.alloc(size, 'base64');
    const gf = new omggif.GifWriter(buf, this.sizeX, this.sizeY, { loop: 2 });
    const indices: number[] = Array();
    const palette: number[] = Array();

    for (let i = 0; i < size; i++) {
      indices.push(i);
    }

    for (let j = 0; j < 256; j++) {
      // (r, g, b, a)
      const color = Jimp.rgbaToInt(
        getRandomInt(0, 255),
        getRandomInt(0, 255),
        getRandomInt(0, 255),
        getRandomInt(0, 255),
      );
      palette.push(color);
    }

    gf.addFrame(0, 0, this.sizeX, this.sizeY, indices, { palette });
    palette.reverse();
    gf.addFrame(0, 0, this.sizeX, this.sizeY, indices, { palette });

    const data = buf.slice(0, gf.end());

    return this.writeFile(data);
  }

  private writeFile(data: string | Buffer): boolean {
    try {
      fs.writeFileSync(this.completeLocation, data);
      if (this.clean) {
        fs.unlinkSync(this.completeLocation);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  private getMemorySize(data: string): number {
    return Buffer.byteLength(data) / 1024;
  }

  getCreated(): string[] {
    return this.created;
  }

  getLocation(): string {
    return this.location;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  getFileType(): string {
    return this.type;
  }

  private setCompleteLocation() {
    this.completeLocation = this.getLocation() + this.getName() + '.' + this.getFileType();
  }

  setLocation(location?: string) {
    this.location = location !== undefined ? location : './';
    this.setCompleteLocation();
  }

  setName(name?: string) {
    this.name = name !== undefined ? name : getRandomID();
    this.setCompleteLocation();
  }

  setSize(size?: number) {
    this.size = size !== undefined ? size : 20;
    if (size < 2 || size > 200) {
      throw new Error('size has to be between 2KB and 200KB.');
    }
  }

  setType(type: string) {
    if (!(type in FileType)) {
      throw new Error('Unsupported file type: ' + type + '.');
    }
    this.type = type;
    this.setCompleteLocation();
  }

  setClean(clean: boolean) {
    this.clean = clean;
  }

  setImageSize(x: number, y: number) {
    this.sizeX = x;
    this.sizeY = y;
  }
}
