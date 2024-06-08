import { Actor, Color, Engine, ImageSource, Material, SpriteSheet, Vector } from "excalibur";
//@ts-expect-error
import bss from "./assets/bss.png";

import { pixelSwapFrag } from "./shaders/pixelswap";

const asepriteSpriteSheetImage = new ImageSource(bss);
await asepriteSpriteSheetImage.load();

const asepriteSS = SpriteSheet.fromImageSource({
  image: asepriteSpriteSheetImage,
  grid: {
    rows: 2,
    columns: 10,
    spriteWidth: 16,
    spriteHeight: 16,
  },
  spacing: {
    // Optionally specify the offset from the top left of sheet to start parsing
    originOffset: { x: 0, y: 0 },
    // Optionally specify the margin between each sprite
    margin: { x: 0, y: 0 },
  },
});

class Player extends Actor {
  material: Material | undefined = undefined;
  primaryColor = { r: 1.0, g: 0.0, b: 0.0 };
  secondaryColor = { r: 0.0, g: 1.0, b: 0.0 };
  tertiaryColor = { r: 0.0, g: 0.0, b: 1.0 };
  quaternaryColor = { r: 0.0, g: 0.5, b: 0.5 };
  quinaryColor = { r: 0.5, g: 0.0, b: 0.5 };

  constructor() {
    super({
      pos: new Vector(100, 100),
      width: 16,
      height: 16,
      anchor: Vector.Half,
      scale: new Vector(5, 5),
    });
  }
  onInitialize(engine: Engine<any>): void {
    const mySprite = asepriteSS.getSprite(0, 0);
    this.graphics.use(mySprite);

    this.material = engine.graphicsContext.createMaterial({
      name: "custom-material",
      fragmentSource: pixelSwapFrag,
    });
    this.graphics.material = this.material;

    this.updateShader();
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    this.updateShader();
  }

  updateShader() {
    if (this.material)
      this.material.update(shader => {
        shader.use();
        let rslt = shader.trySetUniformFloatColor(
          "primaryColor",
          Color.fromRGB(this.primaryColor.r, this.primaryColor.g, this.primaryColor.b)
        );
        console.log("first rslt", rslt);

        rslt = shader.trySetUniformFloatColor(
          "secondaryColor",
          Color.fromRGB(this.secondaryColor.r, this.secondaryColor.g, this.secondaryColor.b)
        );
        console.log("second rslt", rslt);
        rslt = shader.trySetUniformFloatColor(
          "tertiaryColor",
          Color.fromRGB(this.tertiaryColor.r, this.tertiaryColor.g, this.tertiaryColor.b)
        );
        console.log("third rslt", rslt);
        rslt = shader.trySetUniformFloatColor(
          "quaternaryColor",
          Color.fromRGB(this.quaternaryColor.r, this.quaternaryColor.g, this.quaternaryColor.b)
        );
        console.log("fourth rslt", rslt);
        rslt = shader.trySetUniformFloatColor(
          "quinaryColor",
          Color.fromRGB(this.quinaryColor.r, this.quinaryColor.g, this.quinaryColor.b)
        );
        console.log("fifth rslt", rslt);
      });
  }
}

export const player = new Player();
