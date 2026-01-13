class Solution {
public:
    long long calculate(vector<int>& piles, int k) {
        long long hours = 0;
        for (int i : piles) {
            hours += (i + k - 1) / k;
        }
        return hours;
    }
    int minEatingSpeed(vector<int>& piles, int h) {
        int high=0;
        for (int pile : piles) {
            high = max(high, pile);
        }
        int low = 1;
        int op = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (calculate(piles, mid) <= h) {
                op = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return op;
    }
};