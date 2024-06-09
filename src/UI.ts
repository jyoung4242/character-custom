import { Color, Vector } from "excalibur";
import { player, actorParts } from "./player";

export const template = `
<style> 
    
    hud-layer{
        position: fixed;
        width: 800px;
        height: 600px;
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
        border: 3px solid white;
    }
    body-colors{
        position: absolute;
        width: 400px;
        height: 60px;
        top:20%; 
        left:45%; 
        border: 1px solid white;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    hair-layer{
        position: absolute;
        width: 400px;
        height: 60px;
        top:30%; 
        left:45%; 
        border: 1px solid white;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
     shirt-layer{
        position: absolute;
        width: 400px;
        height: 60px;
        top:40%; 
        left:45%; 
        border: 1px solid white;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    pants-layer{
        position: absolute;
        width: 400px;
        height: 60px;
        top:50%; 
        left:45%; 
        border: 1px solid white;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    shoes-layer{
        position: absolute;
        width: 400px;
        height: 60px;
        top:60%; 
        left:45%; 
        border: 1px solid white;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <hud-layer>
        <hud-rel style="display: block;position: relative; width: 100%; height: 100%;">
            <body-colors>
                <label for="changeSprite">Body</label>
                <select \${==>bodyColorSelect}>
                    <option value="primaryColor">Primary</option>
                    <option value="secondaryColor">Secondary</option>
                </select>
                <input type="color" \${==>bodycolorElement} \${input@=>changeBody} \>
                
            </body-colors>
            <hair-layer>
                    <label for="changeSprite">Hair</label>
                    <button \${click@=>switchHair}>Next Hair</button>
                    <select \${==>hairColorSelect}>
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="tertiaryColor">Tertiary</option>
                        <option value="quaternaryColor">Quaternary</option>
                        <option value="quinaryColor">Quinary</option>
                    </select> 
                    <input type="color" \${==>haircolorElement} \${input@=>changeHair} \>
            </hair-layer>
            <shirt-layer>
                    <label for="changeSprite">Shirt</label>
                    <button \${click@=>switchShirt}>Next Shirt</button>
                    <select \${==>shirtColorSelect}>
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="tertiaryColor">Tertiary</option>
                        <option value="quaternaryColor">Quaternary</option>
                        <option value="quinaryColor">Quinary</option>
                    </select> 
                    <input type="color" \${==>shirtcolorElement} \${input@=>changeShirt} \></shirt-layer>
            <pants-layer>
                    <label for="changeSprite">Pants</label>
                    <button \${click@=>switchPants}>Next Pants</button>
                    <select \${==>pantsColorSelect}>
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="tertiaryColor">Tertiary</option>
                        <option value="quaternaryColor">Quaternary</option>
                        <option value="quinaryColor">Quinary</option>
                    </select> 
                    <input type="color" \${==>pantscolorElement} \${input@=>changePants} \></shirt-layer>
            </pants-layer>
            <shoes-layer>
                    <label for="changeSprite">Shoes</label>
                    <button \${click@=>switchShoes}>Next Shoes</button>
                    <select \${==>shoesColorSelect}>
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="tertiaryColor">Tertiary</option>
                        <option value="quaternaryColor">Quaternary</option>
                        <option value="quinaryColor">Quinary</option>
                    </select> 
                    <input type="color" \${==>shoescolorElement} \${input@=>changeShoes} \></shirt-layer>
            </shoes-layer>
        </hud-rel>
    </hud-layer>
</div>`;

export const model = {
  hairtype: 1,
  shirttype: 1,
  pantsType: 1,
  shoeType: 1,
  changeBody: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    const bodycolor = m.bodycolorElement?.value;
    const colortype = m.bodyColorSelect?.value;
    player.changeColor(actorParts.body, colortype, Color.fromHex(bodycolor));
  },
  switchHair: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    if (m.hairtype) m.hairtype = 0;
    else m.hairtype = 1;
    player.changeSprite(actorParts.hair, new Vector(4, m.hairtype ? 0 : 1));
  },
  changeHair: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    const haircolor = m.haircolorElement?.value;
    const colortype = m.hairColorSelect?.value;
    player.changeColor(actorParts.hair, colortype, Color.fromHex(haircolor));
  },
  switchShirt: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    if (m.shirttype) m.shirttype = 0;
    else m.shirttype = 1;
    player.changeSprite(actorParts.shirt, new Vector(3, m.shirttype ? 0 : 1));
  },
  changeShirt: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    const shirtcolor = m.shirtcolorElement?.value;
    const colortype = m.shirtColorSelect?.value;
    player.changeColor(actorParts.shirt, colortype, Color.fromHex(shirtcolor));
  },
  switchPants: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    if (m.pantsType) m.pantsType = 0;
    else m.pantsType = 1;
    player.changeSprite(actorParts.pants, new Vector(1, m.pantsType ? 0 : 1));
  },
  changePants: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    const pantcolor = m.pantscolorElement.value;
    const colortype = m.pantsColorSelect.value;
    player.changeColor(actorParts.pants, colortype, Color.fromHex(pantcolor));
  },
  switchShoes: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    if (m.shoeType) m.shoeType = 0;
    else m.shoeType = 1;
    player.changeSprite(actorParts.shoes, new Vector(2, m.shoeType ? 0 : 1));
  },
  changeShoes: (_e: any, m: any, _o: any, _a: any, _b: any) => {
    const shoecolor = m.shoescolorElement.value;
    const colortype = m.shoesColorSelect.value;
    player.changeColor(actorParts.shoes, colortype, Color.fromHex(shoecolor));
  },

  bodycolorElement: undefined as HTMLInputElement | undefined,
  shirtcolorElement: undefined as HTMLInputElement | undefined,
  haircolorElement: undefined as HTMLInputElement | undefined,
  shoescolorElement: undefined as HTMLInputElement | undefined,
  pantscolorElement: undefined as HTMLInputElement | undefined,
  bodyColorSelect: undefined as HTMLSelectElement | undefined,
  shirtColorSelect: undefined as HTMLSelectElement | undefined,
  hairColorSelect: undefined as HTMLSelectElement | undefined,
  pantsColorSelect: undefined as HTMLSelectElement | undefined,
  shoesColorSelect: undefined as HTMLSelectElement | undefined,
};
