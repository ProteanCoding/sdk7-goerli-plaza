import { Billboard, BillboardMode, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, PointerEvents, TextAlignMode, TextShape, Transform, engine, inputSystem, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Callback } from "@dcl/sdk/react-ecs";
import { animSpriteDemo, blackFadeActive, buttonErrorDemo, buttonSuccessDemo, cardFlipAnimDemo, coinEmitterDemo, coinSpriteDemo, counterBarDemo, counterDemo, popupAnimatorDemo, popupInstructionDemo, progressBounceAnimator, progressDemo, screenFade, spinRaysDemo, spinnerDemo } from "./test_ui_complex";
import { spinRays, spinner } from "./examples/UISpinner_example";


let tablePositions = [
    Vector3.create(3.2, 1.05, 8),
    Vector3.create(4.2, 1.05, 8),
    Vector3.create(5.2, 1.05, 8),
    Vector3.create(6.2, 1.05, 8),
    Vector3.create(7.2, 1.05, 8),
    Vector3.create(8.2, 1.05, 8),
    Vector3.create(9.2, 1.05, 8),
    Vector3.create(10.2, 1.05, 8),
    Vector3.create(11.2, 1.05, 8),
    Vector3.create(12.2, 1.05, 8),

]

function createUIBox(label: string, pos: Vector3, callback: Callback, modelGLB: string) {
    let testObject = engine.addEntity()

    TextShape.create(testObject, {
        text: label,
        fontSize: 1,
        textAlign: TextAlignMode.TAM_BOTTOM_CENTER,
        paddingBottom: 0.6
    })

    Billboard.create(testObject, {
        billboardMode: BillboardMode.BM_Y
    })

    Transform.create(testObject,
        {
            position: pos
        })
    GltfContainer.create(testObject, { src: modelGLB })

    pointerEventsSystem.onPointerDown(
        {
            entity: testObject,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: label
            }
        },
        function () {
            console.log("clicked entity" + " " + label)
            callback()
        }
    )

}

engine.addSystem((dt: number) => {

    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {

        hideAll()

    }

})

export function hideAll() {
    counterDemo.hide()
    counterBarDemo.hide()
    spinnerDemo.hide()
    animSpriteDemo.hide()
    spinRaysDemo.hide()
    progressDemo.hide()
    cardFlipAnimDemo.hide()
    buttonErrorDemo.hide()
    buttonSuccessDemo.hide()
    popupAnimatorDemo.hide()
    popupInstructionDemo.hide()
    screenFade.hide()

}
export function addEnvironment() {
    let ground = engine.addEntity()
    Transform.create(ground)
    GltfContainer.create(ground, { src: 'models/ground.glb' })


    //MeshCollider.setBox(particleTestObject)

    createUIBox("Complex Example", tablePositions[9], () => {
        hideAll()
        popupInstructionDemo.show()
        screenFade.show()
        counterDemo.show()
        counterBarDemo.show()
        progressDemo.show()
        coinSpriteDemo.show()
        coinEmitterDemo.spawnMultiple(2, 49, 48, 50, 84,
            () => {
                progressDemo.incrementProgressBar(0.02)
                progressBounceAnimator.playAnimation('bounce')
                counterBarDemo.increaseNumberBy(2)
            })
    }, 'models/box.glb')
    createUIBox("Progressbar", tablePositions[7], () => {
        hideAll()
        popupInstructionDemo.show()
        screenFade.show()
        progressDemo.show()
        progressDemo.incrementProgressBar(0.1)
    }, 'models/box.glb')

    createUIBox("Counter", tablePositions[6], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        counterDemo.show()
        counterDemo.increaseNumberBy(1)
    }, 'models/box.glb')

    createUIBox("Spinner Rays", tablePositions[5], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        spinRaysDemo.show()
    }, 'models/box.glb')
    createUIBox("Spinner", tablePositions[4], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        spinnerDemo.show()
    }, 'models/box.glb')
    createUIBox("Sprite Animation", tablePositions[3], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        animSpriteDemo.show()
    }, 'models/box.glb')

    createUIBox("Card Flip", tablePositions[2], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        cardFlipAnimDemo.show()
    }, 'models/box.glb')
    createUIBox("Buttons", tablePositions[1], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        buttonErrorDemo.show()
        buttonSuccessDemo.show()
    }, 'models/box.glb')
    createUIBox("Pop-up", tablePositions[0], () => {
        hideAll()
        screenFade.show()
        popupInstructionDemo.show()
        popupAnimatorDemo.show()
    }, 'models/box.glb')

}


