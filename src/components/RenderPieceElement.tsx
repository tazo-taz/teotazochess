import { mergeClassNames } from "../tJS/functions";
import { seperateBoxTypeValue } from "../utils/box";
import { seperateBoxValue } from "../utils/chess/functions";
import { bishop, king, knight, nacqoci, pawn, piecesValues, queen, rook, W } from "../utils/constants";
import {
    bClassicBishop, bClassicKing, bClassicKnight, bClassicPawn, bClassicQueen, bClassicRook, wClassicBishop, wClassicKing, wClassicKnight, wClassicPawn, wClassicQueen, wClassicRook,
    wNacqociKing, bNacqociKing, wNacqociQueen, bNacqociQueen, wNacqociBishop, bNacqociBishop, wNacqociRook, bNacqociRook, wNacqociPawn, bNacqociPawn, wNacqociKnight, bNacqociKnight
} from "../utils/images";
import useRedux from "../utils/redux";

export type RenderPieceElementType = ({ boxValue, ...props }: {
    boxValue: string;
    className?: string,
    withType?: boolean,
}) => JSX.Element

export const RenderPieceElement: RenderPieceElementType = ({ boxValue, className, withType, ...props }) => {
    let color, type, piece
    const { pieces } = useRedux()

    if (withType) {
        const [colorX, typeX, pieceX] = seperateBoxTypeValue(boxValue);
        color = colorX
        type = typeX
        piece = pieceX
    } else {
        const [colorX, pieceX] = seperateBoxTypeValue(boxValue)
        color = colorX
        type = piecesValues[pieces as keyof typeof piecesValues]
        piece = pieceX
    }

    let pawnSrc, knightSrc, bishopSrc, rookSrc, queenSrc, kingSrc

    switch (type) {
        case nacqoci:
            pawnSrc = color === W ? wNacqociPawn : bNacqociPawn
            knightSrc = color === W ? wNacqociKnight : bNacqociKnight
            bishopSrc = color === W ? wNacqociBishop : bNacqociBishop
            rookSrc = color === W ? wNacqociRook : bNacqociRook
            queenSrc = color === W ? wNacqociQueen : bNacqociQueen
            kingSrc = color === W ? wNacqociKing : bNacqociKing
            break;

        default:
            pawnSrc = color === W ? wClassicPawn : bClassicPawn
            knightSrc = color === W ? wClassicKnight : bClassicKnight
            bishopSrc = color === W ? wClassicBishop : bClassicBishop
            rookSrc = color === W ? wClassicRook : bClassicRook
            queenSrc = color === W ? wClassicQueen : bClassicQueen
            kingSrc = color === W ? wClassicKing : bClassicKing
            break;
    }

    switch (piece) {
        case pawn:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={pawnSrc}
                />
            );

        case knight:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={knightSrc}
                />
            );

        case bishop:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={bishopSrc}
                />
            );

        case rook:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={rookSrc}
                />
            );

        case queen:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={queenSrc}
                />
            );

        case king:
            return (
                <img
                    {...props}
                    className={mergeClassNames(className)}
                    alt=""
                    src={kingSrc}
                />
            );

        default:
            return <></>
    }
};