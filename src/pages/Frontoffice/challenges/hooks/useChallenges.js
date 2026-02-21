/**
 * useChallenges – filtering, searching, and sorting logic.
 *
 * Consumes ChallengeContext and exposes the filtered + sorted list
 * together with filter state & setters.
 */
import { useState, useMemo, useCallback } from 'react';
import { useChallengeContext } from '../context/ChallengeContext';
import { ChallengeUserStatus } from '../data/mockChallenges';

const SORT_OPTIONS = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'acceptance', label: 'Acceptance Rate' },
    { value: 'xp', label: 'XP Reward' },
];

const DIFFICULTY_ORDER = { EASY: 0, MEDIUM: 1, HARD: 2, EXPERT: 3 };

export default function useChallenges() {
    const {
        challenges,
        userProgress,
        getUserProgress,
        isRecommended,
    } = useChallengeContext();

    // ── Filter state ─────────────────────────────────────────
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [recommendedOnly, setRecommendedOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('recommended');

    // Toggle helpers
    const toggleDifficulty = useCallback((d) => {
        setSelectedDifficulties(prev =>
            prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
        );
    }, []);

    const toggleTag = useCallback((t) => {
        setSelectedTags(prev =>
            prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
        );
    }, []);

    const toggleStatus = useCallback((s) => {
        setSelectedStatuses(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        );
    }, []);

    // ── Derive user status for a challenge ───────────────────
    const getChallengeStatus = useCallback((challengeId) => {
        const progress = userProgress.find(p => p.challengeId === challengeId);
        return progress?.status || ChallengeUserStatus.UNSOLVED;
    }, [userProgress]);

    // ── Counts (for sidebar) ─────────────────────────────────
    const difficultyCounts = useMemo(() => {
        const counts = {};
        challenges.forEach(c => {
            counts[c.difficulty] = (counts[c.difficulty] || 0) + 1;
        });
        return counts;
    }, [challenges]);

    const tagCounts = useMemo(() => {
        const counts = {};
        challenges.forEach(c => {
            c.tags.forEach(t => {
                counts[t] = (counts[t] || 0) + 1;
            });
        });
        return counts;
    }, [challenges]);

    // ── Filtered + sorted list ───────────────────────────────
    const filteredChallenges = useMemo(() => {
        let result = challenges;

        // Difficulty
        if (selectedDifficulties.length > 0) {
            result = result.filter(c => selectedDifficulties.includes(c.difficulty));
        }

        // Tags (match any)
        if (selectedTags.length > 0) {
            result = result.filter(c => c.tags.some(t => selectedTags.includes(t)));
        }

        // Status
        if (selectedStatuses.length > 0) {
            result = result.filter(c => selectedStatuses.includes(getChallengeStatus(c.id)));
        }

        // Recommended only
        if (recommendedOnly) {
            result = result.filter(c => isRecommended(c));
        }

        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        // Sort
        switch (sortOption) {
            case 'difficulty':
                result = [...result].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
                break;
            case 'acceptance':
                result = [...result].sort((a, b) => b.acceptanceRate - a.acceptanceRate);
                break;
            case 'xp':
                result = [...result].sort((a, b) => b.xpReward - a.xpReward);
                break;
            case 'recommended':
            default:
                // recommended first, then by difficulty
                result = [...result].sort((a, b) => {
                    const aRec = isRecommended(a) ? 0 : 1;
                    const bRec = isRecommended(b) ? 0 : 1;
                    if (aRec !== bRec) return aRec - bRec;
                    return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
                });
                break;
        }

        return result;
    }, [
        challenges,
        selectedDifficulties,
        selectedTags,
        selectedStatuses,
        recommendedOnly,
        searchQuery,
        sortOption,
        getChallengeStatus,
        isRecommended,
    ]);

    return {
        filteredChallenges,
        totalCount: challenges.length,
        filteredCount: filteredChallenges.length,

        // Filter state
        selectedDifficulties,
        selectedTags,
        selectedStatuses,
        recommendedOnly,
        searchQuery,
        sortOption,

        // Filter setters
        toggleDifficulty,
        toggleTag,
        toggleStatus,
        setRecommendedOnly,
        setSearchQuery,
        setSortOption,

        // Constants
        SORT_OPTIONS,
        difficultyCounts,
        tagCounts,

        // Helpers
        getChallengeStatus,
    };
}
