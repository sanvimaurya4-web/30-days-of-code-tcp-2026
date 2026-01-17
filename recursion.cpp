#include <iostream>

using namespace std;

class Solution {
public:
    long long MOD = 1e9 + 7;

    // Function to calculate (base^exp) % MOD using binary exponentiation
    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp /= 2;
        }
        return res;
    }

    int countGoodNumbers(long long n) {
        long long evenPositions = (n + 1) / 2;
        long long oddPositions = n / 2;
        
        // Total = (5^even * 4^odd) % MOD
        long long firstPart = power(5, evenPositions);
        long long secondPart = power(4, oddPositions);
        
        return (firstPart * secondPart) % MOD;
    }
};

int main() {
    Solution sol;
    long long n;
    cout << "Enter n: ";
    cin >> n;
    cout << "Total good digit strings: " << sol.countGoodNumbers(n) << endl;
    return 0;
}
