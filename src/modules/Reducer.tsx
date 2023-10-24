

export function quizReducer(state: QuizContextState, action: QuizContextAction): QuizContextState {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                accessToken: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
}