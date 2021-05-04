class Solution {
    santaGoTo(directions) {
        let floor = 0;
        [...directions].forEach(direction => {
            if(direction == '('){
                floor++;
            } else {
                floor--;
            }

        });
        return floor;
    }
}
module.exports = Solution;