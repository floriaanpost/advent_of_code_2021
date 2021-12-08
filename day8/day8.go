package main

import (
	"fmt"
	"log"
	"math"
	"os"
	"sort"
	"strings"
)

type entry struct {
	input  []string
	output []string
}

func main() {
	content, _ := os.ReadFile("./input")
	lines := strings.Split(string(content), "\n")

	var entries []entry
	for _, line := range lines {
		parts := strings.Split(line, " | ")
		input := strings.Split(parts[0], " ")
		output := strings.Split(parts[1], " ")

		entries = append(entries, entry{
			input:  toSorted(input),
			output: toSorted(output),
		})
	}

	part1(entries)
	part2(entries)
}

type ruleList []func(string, map[int]string) bool
type ruleSet []struct {
	number int
	rules  ruleList
}

func part1(entries []entry) {
	rules := ruleSet{
		{1, ruleList{count(2)}},
		{4, ruleList{count(4)}},
		{7, ruleList{count(3)}},
		{8, ruleList{count(7)}},
	}
	count := 0
	for _, e := range entries {
		_, c := match(e.output, rules)
		count += c
	}
	fmt.Println(count)
}

func part2(entries []entry) {
	rules := ruleSet{
		{1, ruleList{count(2)}},
		{4, ruleList{count(4)}},
		{7, ruleList{count(3)}},
		{8, ruleList{count(7)}},
		{5, ruleList{count(5), common(4, 3), common(1, 1)}},
		{6, ruleList{count(6), common(5, 5), common(1, 1)}},
		{9, ruleList{count(6), common(5, 5), common(1, 2)}},
		{3, ruleList{count(5), common(4, 3), common(1, 2)}},
		{2, ruleList{count(5), common(3, 4), common(6, 4)}},
	}

	sum := 0
	for _, e := range entries {
		matches, _ := match(e.input, rules)
		for ix, v1 := range e.output {
			for num, v2 := range matches {
				if v1 == v2 {
					sum += int(math.Pow10(len(e.output)-ix-1)) * num
				}
			}
		}
	}
	fmt.Println(sum)
}

func match(row []string, rules ruleSet) (map[int]string, int) {
	matches := make(map[int]string)
	matchCount := 0
	for _, rulesForNumber := range rules {
		poss := row
		for _, rule := range rulesForNumber.rules {
			var newPos []string
			for _, entry := range poss {
				if rule(entry, matches) { // fix this!
					poss = append(poss, entry)
					matchCount++
					newPos = append(newPos, entry)
				}
			}
			poss = newPos
		}
		if len(poss) > 0 {
			for _, p := range poss {
				if p != poss[0] {
					log.Fatal("Wrong ruleset!")
					break
				}
			}
			matches[rulesForNumber.number] = poss[0]
		}
	}
	return matches, matchCount
}

type RuneSort []rune

func (r RuneSort) Len() int           { return len(r) }
func (r RuneSort) Less(i, j int) bool { return r[i] < r[j] }
func (r RuneSort) Swap(i, j int)      { r[i], r[j] = r[j], r[i] }

func toSorted(ss []string) []string {
	var raw []string
	for _, s := range ss {
		runes := []rune(s)
		sort.Sort(RuneSort(runes))
		raw = append(raw, string(runes))
	}
	return raw
}

/*  Rules  */

// count simply counts the amount of characters there are in the entry
func count(length int) func(string, map[int]string) bool {
	return func(s string, _ map[int]string) bool {
		return len(s) == length
	}
}

// common checks if the amount of characters in common match with an already found number
func common(number int, amount int) func(string, map[int]string) bool {
	return func(s string, found map[int]string) bool {
		f := found[number]
		counter := 0
		for _, r1 := range f {
			for _, r2 := range s {
				if r1 == r2 {
					counter++
				}
			}
		}
		return counter == amount
	}
}
