#include <vector>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        // 1. Build a hash set from the input vector for O(1) lookups
        std::unordered_set<int> numSet(nums.begin(), nums.end());
        int maxStreak = 0;

        // 2. Iterate through each unique number in the set
        for (int num : numSet) {
            // Check if 'num' is the START of a sequence.
            // It is a start if 'num - 1' is NOT in the set.
            if (numSet.find(num - 1) == numSet.end()) {
                int currentNum = num;
                int currentStreak = 1;

                // 3. Expand the sequence by checking for consecutive numbers
                while (numSet.find(currentNum + 1) != numSet.end()) {
                    currentNum++;
                    currentStreak++;
                }

                // 4. Update the overall maximum length found
                maxStreak = std::max(maxStreak, currentStreak);
            }
        }
        return maxStreak;
    }
};
