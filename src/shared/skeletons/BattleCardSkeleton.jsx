/**
 * BattleCardSkeleton – Loading state for battle cards
 * 
 * Used in battle list grid.
 */
import React from 'react';
import { Box, Flex, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import useAccessibility from '../../accessibility/hooks/useAccessibility';

const BattleCardSkeleton = ({ count = 6 }) => {
    const { settings } = useAccessibility();
    const speed = settings?.reducedMotion ? 0 : 0.8;

    return (
        <>
            {[...Array(count)].map((_, i) => (
                <Box
                    key={i}
                    p={5}
                    bg="rgba(30,41,59,0.6)"
                    borderRadius="12px"
                    border="1px solid rgba(100,116,139,0.3)"
                >
                    {/* Header with mode badge */}
                    <Flex justify="space-between" align="center" mb={4}>
                        <Skeleton height="20px" width="80px" borderRadius="full" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        <Skeleton height="20px" width="60px" borderRadius="full" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                    </Flex>

                    {/* Opponent info */}
                    <Flex align="center" gap={3} mb={4}>
                        <SkeletonCircle size="48px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        <Box flex="1">
                            <Skeleton height="18px" width="140px" mb={2} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                            <Skeleton height="14px" width="100px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        </Box>
                    </Flex>

                    {/* Challenge info */}
                    <Box mb={4} p={3} bg="rgba(15,23,42,0.4)" borderRadius="8px">
                        <Skeleton height="16px" width="120px" mb={2} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                        <SkeletonText noOfLines={1} speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                    </Box>

                    {/* Action button */}
                    <Skeleton height="40px" width="100%" borderRadius="8px" speed={speed} startColor="rgba(30,41,59,0.8)" endColor="rgba(30,41,59,1)" />
                </Box>
            ))}
        </>
    );
};

export default BattleCardSkeleton;
