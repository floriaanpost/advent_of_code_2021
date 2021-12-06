f = open("input", "r")
init_fish = [int(n) for n in f.read().split(",")]
f.close()

# amount of fish per "days to spawn"
population = {days: init_fish.count(days) for days in init_fish}
first_reproduction = 9  # amount of days it takes for a just born fish to reproduce
other_reproduction = 7  # amount of days it takes for an older fish to reproduce


def simulate(population, time):
    for _ in range(time):
        new_population = {i: 0 for i in range(first_reproduction)}
        for days, amount in population.items():
            if (days == 0):
                new_population[other_reproduction - 1] += amount
                new_population[first_reproduction - 1] += amount
            else:
                new_population[days - 1] += amount
        population = new_population
    return population


print(sum(simulate(population, 80).values()))
print(sum(simulate(population, 256).values()))
