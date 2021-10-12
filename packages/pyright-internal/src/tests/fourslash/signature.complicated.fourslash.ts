/// <reference path="fourslash.ts" />

// @filename: complicated.py
//// from typing import Any, Optional, Type, Union
////
//// class A:
////     def __init__(self, x: bool): ...
////
////     def __call__(self, z: float) -> complex: ...
////
////     def complicated(self, a: int, b: int, c: int = 1234, d: Optional[str] = None, **kwargs: Any) -> Union[int, str]: ...
////
//// x = A(True[|/*init1*/|])
////
//// x.complicated([|/*c1*/|])
////
//// x.complicated(1, [|/*c2*/|])
////
//// x.complicated(1, [|/*c3/|], 3)
////
//// x.complicated(1[|/*cA*/|],[|/*cB*/|] 2, 3, x=[|/*cX*/|]123, d="wo[|/*cD*/|]w", z[|/*cZ*/|]=1234)
////
//// x([|/*call*/|])
////
//// def get_cls() -> Type[A]:
////     return A
////
//// y = get_cls()
////
//// y(True[|/*init2*/|])

{
    const xInitSignatures = [
        {
            label: 'complicated.A.__init__(x)',
            parameters: ['x'],
        },
    ];

    const xComplicatedSignatures = [
        {
            label: 'complicated.A.complicated(a, b, c = 1234, d = None, **kwargs)',
            parameters: ['a', 'b', 'c = 1234', 'd = None', '**kwargs'],
        },
    ];

    const xCallSignatures = [
        {
            label: 'complicated.A.__call__(z)',
            parameters: ['z'],
        },
    ];

    helper.verifySignature('plaintext', {
        init1: {
            signatures: xInitSignatures,
            activeParameters: [0],
        },
        init2: {
            signatures: xInitSignatures,
            activeParameters: [0],
        },
        c1: {
            signatures: xComplicatedSignatures,
            activeParameters: [0],
        },
        c2: {
            signatures: xComplicatedSignatures,
            activeParameters: [1],
        },
        c3: {
            signatures: xComplicatedSignatures,
            activeParameters: [1],
        },
        cA: {
            signatures: xComplicatedSignatures,
            activeParameters: [0],
        },
        cB: {
            signatures: xComplicatedSignatures,
            activeParameters: [1],
        },
        cX: {
            signatures: xComplicatedSignatures,
            activeParameters: [4],
        },
        cD: {
            signatures: xComplicatedSignatures,
            activeParameters: [3],
        },
        cZ: {
            signatures: xComplicatedSignatures,
            activeParameters: [4],
        },
        call: {
            signatures: xCallSignatures,
            activeParameters: [0],
        },
    });
}
