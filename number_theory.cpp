class Solution {
private:
    long long gcd(long long x, long long y) {
        while (y) {
            long long t = x % y;
            x = y;
            y = t;
        }
        return x;
    }
    long long lcm(long long x, long long y) {
        return x * y / gcd(x, y);
    }
public:
    int nthUglyNumber(int n, int a, int b, int c) {
        long long ab = lcm(a, b);
        long long bc = lcm(b, c);
        long long ca = lcm(c, a);
        long long abc = lcm(ab, c);
        long long low = 1, high = (long long)min({a, b, c}) * n;
        while (low < high) {
            long long mid = low + (high - low) / 2;
            long long cnt = mid / a + mid / b + mid / c
                          - mid / ab - mid / bc - mid / ca
                          + mid / abc;
            if (cnt < n) low = mid + 1;
            else high = mid;
        }
        return (int)low;
    }
};