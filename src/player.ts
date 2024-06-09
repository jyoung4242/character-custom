import { Actor, Color, Engine, ImageSource, Material, SpriteSheet, Vector } from "excalibur";
//@ts-expect-error
import bss from "./assets/bss.png";
import { pixelSwapFrag } from "./shaders/pixelswap";

export enum actorParts {
  body = "body",
  shirt = "shirt",
  pants = "pants",
  hair = "hair",
  shoes = "shoes",
}

export enum colorTypes {
  primary = "primaryColor",
  secondary = "secondaryColor",
  tertiary = "tertiaryColor",
  quaternary = "quaternaryColor",
  quinary = "quinaryColor",
}

type SubChildren = {
  body: Player | null;
  shirt: Player | null;
  pants: Player | null;
  hair: Player | null;
  shoes: Player | null;
};

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
  type: actorParts = actorParts.body;
  material: Material | undefined = undefined;
  primaryColor = { r: 238, g: 195, b: 154 };
  secondaryColor = { r: 143, g: 86, b: 59 };
  tertiaryColor = { r: 0, g: 0, b: 255 };
  quaternaryColor = { r: 238, g: 195, b: 154 };
  quinaryColor = { r: 128, g: 0, b: 128 };
  subChildren: SubChildren = {
    body: null,
    shirt: null,
    pants: null,
    hair: null,
    shoes: null,
  };

  constructor(pos: Vector, scale: Vector) {
    super({
      pos: pos,
      width: 16,
      height: 16,
      anchor: Vector.Half,
      scale: scale,
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
    this.subChildren.shirt = new Shirt();
    this.subChildren.pants = new Pants();
    this.subChildren.hair = new Hair();
    this.subChildren.shoes = new Shoes();

    this.addChild(this.subChildren.shirt);
    this.addChild(this.subChildren.pants);
    this.addChild(this.subChildren.hair);
    this.addChild(this.subChildren.shoes);
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    this.updateShader();
  }

  changeColor(part: actorParts, colorType: colorTypes, color: Color) {
    if (part == this.type) {
      this[colorType] = { r: color.r, g: color.g, b: color.b };
    } else this.subChildren[part]?.changeColor(part, colorType, color);
  }

  getColor(part: actorParts, colorType: colorTypes): { r: number; g: number; b: number } | undefined {
    if (part == this.type) {
      return this[colorType];
    } else return this.subChildren[part]?.getColor(part, colorType);
  }

  changeSprite(part: actorParts, sprite: Vector) {
    if (part == this.type) {
      this.graphics.use(asepriteSS.getSprite(sprite.x, sprite.y));
    } else this.subChildren[part]?.changeSprite(part, sprite);
  }

  updateShader() {
    if (this.material)
      this.material.update(shader => {
        let rslt = shader.trySetUniformFloatColor(
          "primaryColor",
          Color.fromRGB(this.primaryColor.r, this.primaryColor.g, this.primaryColor.b)
        );

        rslt = shader.trySetUniformFloatColor(
          "secondaryColor",
          Color.fromRGB(this.secondaryColor.r, this.secondaryColor.g, this.secondaryColor.b)
        );
        rslt = shader.trySetUniformFloatColor(
          "tertiaryColor",
          Color.fromRGB(this.tertiaryColor.r, this.tertiaryColor.g, this.tertiaryColor.b)
        );
        rslt = shader.trySetUniformFloatColor(
          "quaternaryColor",
          Color.fromRGB(this.quaternaryColor.r, this.quaternaryColor.g, this.quaternaryColor.b)
        );
        rslt = shader.trySetUniformFloatColor(
          "quinaryColor",
          Color.fromRGB(this.quinaryColor.r, this.quinaryColor.g, this.quinaryColor.b)
        );
      });
  }
}
class Shirt extends Player {
  constructor() {
    super(new Vector(0, 0), new Vector(1, 1));
    this.primaryColor = { r: 0, g: 200, b: 50 };
    this.secondaryColor = { r: 125, g: 55, b: 0 };
    this.tertiaryColor = { r: 20, g: 25, b: 100 };
    this.quaternaryColor = { r: 0, g: 128, b: 128 };
    this.quinaryColor = { r: 128, g: 0, b: 128 };
    this.z = 2;
    this.type = actorParts.shirt;
  }
  onInitialize(engine: Engine<any>): void {
    const mySprite = asepriteSS.getSprite(3, 0);
    this.graphics.use(mySprite);
    this.material = engine.graphicsContext.createMaterial({
      name: "custom-material",
      fragmentSource: pixelSwapFrag,
    });
    this.graphics.material = this.material;

    this.updateShader();
  }
}
class Pants extends Player {
  constructor() {
    super(new Vector(0, 0), new Vector(1, 1));
    this.primaryColor = { r: 200, g: 200, b: 255 };
    this.secondaryColor = { r: 15, g: 15, b: 15 };
    this.tertiaryColor = { r: 255, g: 255, b: 255 };
    this.quaternaryColor = { r: 0, g: 128, b: 128 };
    this.quinaryColor = { r: 128, g: 0, b: 128 };
    this.z = 1;
    this.type = actorParts.pants;
  }
  onInitialize(engine: Engine<any>): void {
    const mySprite = asepriteSS.getSprite(1, 0);
    this.graphics.use(mySprite);
    this.material = engine.graphicsContext.createMaterial({
      name: "custom-material",
      fragmentSource: pixelSwapFrag,
    });
    this.graphics.material = this.material;

    this.updateShader();
  }
}
class Hair extends Player {
  constructor() {
    super(new Vector(0, 0), new Vector(1, 1));
    this.primaryColor = { r: 143, g: 86, b: 59 };
    this.secondaryColor = { r: 150, g: 95, b: 65 };
    this.tertiaryColor = { r: 143, g: 86, b: 59 };
    this.quaternaryColor = { r: 143, g: 86, b: 59 };
    this.quinaryColor = { r: 128, g: 0, b: 128 };
    this.z = 4;
    this.type = actorParts.hair;
  }
  onInitialize(engine: Engine<any>): void {
    const mySprite = asepriteSS.getSprite(4, 0);
    this.graphics.use(mySprite);
    this.material = engine.graphicsContext.createMaterial({
      name: "custom-material",
      fragmentSource: pixelSwapFrag,
    });
    this.graphics.material = this.material;

    this.updateShader();
  }
}
class Shoes extends Player {
  constructor() {
    super(new Vector(0, 0), new Vector(1, 1));
    this.primaryColor = { r: 5, g: 5, b: 5 };
    this.secondaryColor = { r: 251, g: 242, b: 54 };
    this.tertiaryColor = { r: 0, g: 0, b: 255 };
    this.quaternaryColor = { r: 0, g: 128, b: 128 };
    this.quinaryColor = { r: 128, g: 0, b: 128 };
    this.z = 3;
    this.type = actorParts.shoes;
  }
  onInitialize(engine: Engine<any>): void {
    const mySprite = asepriteSS.getSprite(2, 0);
    this.graphics.use(mySprite);
    this.material = engine.graphicsContext.createMaterial({
      name: "custom-material",
      fragmentSource: pixelSwapFrag,
    });
    this.graphics.material = this.material;

    this.updateShader();
  }
}

export const player = new Player(new Vector(200, 200), new Vector(15, 15));
