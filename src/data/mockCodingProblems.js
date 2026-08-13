export const MOCK_CODING_PROBLEMS = [
  {
    id: 'prob-1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Two Pointers'],
    solved: true,
    bookmarked: true,
    accuracy: '89%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists.'
    ],
    code_templates: {
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}`,
      javascript: `function twoSum(nums, target) {\n    // Write your solution here\n};`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass`
    }
  },
  {
    id: 'prob-2',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['String', 'Sliding Window', 'Hash Table'],
    solved: false,
    bookmarked: true,
    accuracy: '64%',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    code_templates: {
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Solution\n        return 0;\n    }\n}`,
      javascript: `function lengthOfLongestSubstring(s) {\n    // Solution\n};`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`
    }
  },
  {
    id: 'prob-3',
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    difficulty: 'Hard',
    category: 'Heap & Divide and Conquer',
    tags: ['Linked List', 'Divide and Conquer', 'Heap / Priority Queue'],
    solved: false,
    bookmarked: false,
    accuracy: '42%',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.\n\n*Merge all the linked-lists into one sorted linked-list and return it.*`,
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6'
      }
    ],
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '-10^4 <= lists[i][j] <= 10^4'
    ],
    code_templates: {
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        return null;\n    }\n}`,
      javascript: `function mergeKLists(lists) {\n    // Solution\n};`,
      python: `class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        pass`
    }
  },
  {
    id: 'prob-4',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    solved: true,
    bookmarked: false,
    accuracy: '85%',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4'],
    code_templates: {
      javascript: `function isValid(s) {\n    // Solution\n};`
    }
  },
  {
    id: 'prob-5',
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    category: 'Trees & BFS',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    solved: true,
    bookmarked: true,
    accuracy: '71%',
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].'],
    code_templates: {
      javascript: `function levelOrder(root) {\n    // Solution\n};`
    }
  }
];
