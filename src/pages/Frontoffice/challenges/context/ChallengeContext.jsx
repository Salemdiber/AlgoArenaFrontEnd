/**
 * ChallengeContext – centralised state for the Challenges feature.
 *
 * Holds:
 *  • challenge catalogue + user progress
 *  • selected challenge + editor state
 *  • execution results & active tab
 *  • derived computed helpers
 */
import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import {
    mockChallenges,
    mockUserProgress,
    mockCurrentUser,
    ChallengeUserStatus,
    RANK_META,
    RANK_RECOMMENDATIONS,
    LANGUAGES,
} from '../data/mockChallenges';

// ─── Action types ─────────────────────────────────────────────────
const ActionTypes = {
    SELECT_CHALLENGE: 'SELECT_CHALLENGE',
    DESELECT_CHALLENGE: 'DESELECT_CHALLENGE',
    SET_CODE: 'SET_CODE',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
    SET_TEST_RESULTS: 'SET_TEST_RESULTS',
    SET_RUNNING: 'SET_RUNNING',
    SET_SUBMITTING: 'SET_SUBMITTING',
    CLEAR_RESULTS: 'CLEAR_RESULTS',
    MARK_SOLVED: 'MARK_SOLVED',
    ADD_XP: 'ADD_XP',
    RESET_CODE: 'RESET_CODE',
};

// ─── Initial state ────────────────────────────────────────────────
const initialState = {
    challenges: mockChallenges,
    userProgress: mockUserProgress,
    user: { ...mockCurrentUser },

    // Play view state
    selectedChallengeId: null,
    code: '',
    language: LANGUAGES[0].value,
    activeTab: 0, // 0 = Description, 1 = Discussion, 2 = Submissions

    // Execution
    testResults: [],
    isRunning: false,
    isSubmitting: false,
    executionState: 'idle', // 'idle' | 'running' | 'success' | 'failure'
};

// ─── Reducer ──────────────────────────────────────────────────────
function challengeReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SELECT_CHALLENGE: {
            const ch = state.challenges.find(c => c.id === action.payload);
            if (!ch) return state;
            const starterCode = ch.starterCode?.[state.language] || '// Start coding here\n';
            return {
                ...state,
                selectedChallengeId: action.payload,
                code: starterCode,
                testResults: [],
                executionState: 'idle',
                activeTab: 0,
            };
        }
        case ActionTypes.DESELECT_CHALLENGE:
            return {
                ...state,
                selectedChallengeId: null,
                code: '',
                testResults: [],
                executionState: 'idle',
                activeTab: 0,
            };
        case ActionTypes.SET_CODE:
            return { ...state, code: action.payload };
        case ActionTypes.SET_LANGUAGE: {
            const ch = state.challenges.find(c => c.id === state.selectedChallengeId);
            const starterCode = ch?.starterCode?.[action.payload] || '// Start coding here\n';
            return { ...state, language: action.payload, code: starterCode };
        }
        case ActionTypes.SET_ACTIVE_TAB:
            return { ...state, activeTab: action.payload };
        case ActionTypes.SET_TEST_RESULTS:
            return {
                ...state,
                testResults: action.payload.results,
                executionState: action.payload.allPassed ? 'success' : 'failure',
            };
        case ActionTypes.SET_RUNNING:
            return { ...state, isRunning: action.payload, executionState: action.payload ? 'running' : state.executionState };
        case ActionTypes.SET_SUBMITTING:
            return { ...state, isSubmitting: action.payload };
        case ActionTypes.CLEAR_RESULTS:
            return { ...state, testResults: [], executionState: 'idle' };
        case ActionTypes.MARK_SOLVED: {
            const existing = state.userProgress.find(p => p.challengeId === action.payload.challengeId);
            const avgRuntime = action.payload.avgRuntime;
            const avgMemory = action.payload.avgMemory;
            const xp = action.payload.xp;
            if (existing) {
                return {
                    ...state,
                    userProgress: state.userProgress.map(p =>
                        p.challengeId === action.payload.challengeId
                            ? { ...p, status: ChallengeUserStatus.SOLVED, bestRuntime: avgRuntime, bestMemory: avgMemory, earnedXp: xp }
                            : p
                    ),
                };
            }
            return {
                ...state,
                userProgress: [
                    ...state.userProgress,
                    {
                        challengeId: action.payload.challengeId,
                        status: ChallengeUserStatus.SOLVED,
                        bestRuntime: avgRuntime,
                        bestMemory: avgMemory,
                        earnedXp: xp,
                    },
                ],
            };
        }
        case ActionTypes.ADD_XP:
            return { ...state, user: { ...state.user, xp: state.user.xp + action.payload } };
        case ActionTypes.RESET_CODE: {
            const ch = state.challenges.find(c => c.id === state.selectedChallengeId);
            const starterCode = ch?.starterCode?.[state.language] || '// Start coding here\n';
            return { ...state, code: starterCode, testResults: [], executionState: 'idle' };
        }
        default:
            return state;
    }
}

// ─── Context ──────────────────────────────────────────────────────
const ChallengeContext = createContext(null);

export const ChallengeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(challengeReducer, initialState);

    // ── Actions ──────────────────────────────────────────────
    const selectChallenge = useCallback((id) => dispatch({ type: ActionTypes.SELECT_CHALLENGE, payload: id }), []);
    const deselectChallenge = useCallback(() => dispatch({ type: ActionTypes.DESELECT_CHALLENGE }), []);
    const setCode = useCallback((code) => dispatch({ type: ActionTypes.SET_CODE, payload: code }), []);
    const setLanguage = useCallback((lang) => dispatch({ type: ActionTypes.SET_LANGUAGE, payload: lang }), []);
    const setActiveTab = useCallback((idx) => dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: idx }), []);
    const clearResults = useCallback(() => dispatch({ type: ActionTypes.CLEAR_RESULTS }), []);
    const resetCode = useCallback(() => dispatch({ type: ActionTypes.RESET_CODE }), []);

    const setTestResults = useCallback((results, allPassed) => {
        dispatch({ type: ActionTypes.SET_TEST_RESULTS, payload: { results, allPassed } });
    }, []);

    const markSolved = useCallback((challengeId, avgRuntime, avgMemory, xp) => {
        dispatch({ type: ActionTypes.MARK_SOLVED, payload: { challengeId, avgRuntime, avgMemory, xp } });
        dispatch({ type: ActionTypes.ADD_XP, payload: xp });
    }, []);

    const setRunning = useCallback((v) => dispatch({ type: ActionTypes.SET_RUNNING, payload: v }), []);
    const setSubmitting = useCallback((v) => dispatch({ type: ActionTypes.SET_SUBMITTING, payload: v }), []);

    // ── Derived ──────────────────────────────────────────────
    const selectedChallenge = useMemo(
        () => state.challenges.find(c => c.id === state.selectedChallengeId) || null,
        [state.challenges, state.selectedChallengeId]
    );

    const getUserProgress = useCallback(
        (challengeId) => state.userProgress.find(p => p.challengeId === challengeId) || null,
        [state.userProgress]
    );

    const rankMeta = useMemo(() => RANK_META[state.user.rank], [state.user.rank]);
    const xpToNextRank = useMemo(() => rankMeta?.xpCeil || 10000, [rankMeta]);
    const progressPercent = useMemo(
        () => Math.min(100, Math.round((state.user.xp / xpToNextRank) * 100)),
        [state.user.xp, xpToNextRank]
    );

    const recommendedDifficulties = useMemo(
        () => RANK_RECOMMENDATIONS[state.user.rank] || [],
        [state.user.rank]
    );

    const isRecommended = useCallback(
        (challenge) => recommendedDifficulties.includes(challenge.difficulty),
        [recommendedDifficulties]
    );

    // Pack everything
    const value = useMemo(() => ({
        ...state,
        selectedChallenge,
        getUserProgress,
        rankMeta,
        xpToNextRank,
        progressPercent,
        recommendedDifficulties,
        isRecommended,

        selectChallenge,
        deselectChallenge,
        setCode,
        setLanguage,
        setActiveTab,
        setTestResults,
        markSolved,
        clearResults,
        resetCode,
        setRunning,
        setSubmitting,
    }), [
        state,
        selectedChallenge,
        getUserProgress,
        rankMeta,
        xpToNextRank,
        progressPercent,
        recommendedDifficulties,
        isRecommended,
        selectChallenge,
        deselectChallenge,
        setCode,
        setLanguage,
        setActiveTab,
        setTestResults,
        markSolved,
        clearResults,
        resetCode,
        setRunning,
        setSubmitting,
    ]);

    return (
        <ChallengeContext.Provider value={value}>
            {children}
        </ChallengeContext.Provider>
    );
};

export const useChallengeContext = () => {
    const ctx = useContext(ChallengeContext);
    if (!ctx) throw new Error('useChallengeContext must be used inside ChallengeProvider');
    return ctx;
};
