import Konva from "konva";

class ComponentFactory {


    static create(type: string, params: any) {
        switch (type) {
            case 'rect':

                return new Konva.Rect(params)


            case 'line':

                return new Konva.Line(params)

            case 'text':

                return new Konva.Text(params)

            case 'textpath':

                return new Konva.TextPath(params)

        }
    }
}


export {
    ComponentFactory
}