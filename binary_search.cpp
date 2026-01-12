class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return {-1, -1};     
        int last = findBound(nums, target, false);
        return {first, last};
    }
private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int start = 0, end = nums.size() - 1;
        int result = -1;
        
        while (start <= end) {
            int mid = start + (end - start) / 2; 
            
            if (nums[mid] == target) {
                result = mid;
                if (isFirst) end = mid - 1; 
                else start = mid + 1;      
            } 
            else if (nums[mid] > target) {
                end = mid - 1;
            } 
            else {
                start = mid + 1;
            }
        }
        return result;
    }
};