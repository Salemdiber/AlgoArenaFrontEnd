/**
 * BattleFilters – sidebar filter panel
 */
import React, { useState } from 'react';
import { BattleMode, BattleStatus } from '../types/battle.types';

const BattleFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        modes: [],
        statuses: [],
        search: '',
    });

    const toggleFilter = (key, value) => {
        setFilters(prev => {
            const arr = prev[key];
            const updated = arr.includes(value)
                ? arr.filter(v => v !== value)
                : [...arr, value];
            const next = { ...prev, [key]: updated };
            onFilterChange?.(next);
            return next;
        });
    };

    const handleSearch = (e) => {
        const next = { ...filters, search: e.target.value };
        setFilters(next);
        onFilterChange?.(next);
    };

    return (
        <aside style={{ width: '100%', maxWidth: '16rem' }}>
            {/* Mode Filters */}
            <div className="battle-filter-panel battle-mb-md">
                <h3>Mode</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.modes.includes(BattleMode.ONE_VS_ONE)}
                            onChange={() => toggleFilter('modes', BattleMode.ONE_VS_ONE)}
                        />
                        <span>1vs1</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.modes.includes(BattleMode.ONE_VS_AI)}
                            onChange={() => toggleFilter('modes', BattleMode.ONE_VS_AI)}
                        />
                        <span>1vsAI</span>
                    </label>
                </div>
            </div>

            {/* Status Filters */}
            <div className="battle-filter-panel battle-mb-md">
                <h3>Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[BattleStatus.ACTIVE, BattleStatus.WAITING, BattleStatus.COMPLETED].map(status => (
                        <label key={status}>
                            <input
                                type="checkbox"
                                checked={filters.statuses.includes(status)}
                                onChange={() => toggleFilter('statuses', status)}
                            />
                            <span>{status.charAt(0) + status.slice(1).toLowerCase()}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div className="battle-filter-panel">
                <h3>Search</h3>
                <input
                    type="text"
                    placeholder="Opponent name..."
                    value={filters.search}
                    onChange={handleSearch}
                />
            </div>
        </aside>
    );
};

export default BattleFilters;
