import React from 'react'
import { IHistory } from '../../utils/chess/chess';
import HistoryComponent from './History.component';

export default function History({ history }: { history: IHistory[] }) {

    const HistoryComponentProps = {
        history
    }

    return (
        <HistoryComponent {...HistoryComponentProps} />
    )
}
