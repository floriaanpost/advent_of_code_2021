import Data.List.Split
import Data.List.Unique
import System.IO

data Point = Point {x :: Int, y :: Int} deriving (Show, Eq)

-- make sortable, rows first (although it doesn't really matter in this case)
instance Ord Point where
  compare p1 p2
    | y p1 < y p2 = LT
    | y p1 > y p2 = GT
    | y p1 == y p2 && x p1 < x p2 = LT
    | y p1 == y p2 && x p1 > x p2 = GT
    | otherwise = EQ

data Line = Line {start :: Point, stop :: Point} deriving (Show)

main :: IO ()
main = do
  handle <- openFile "input" ReadMode
  content <- hGetContents handle
  let vents = map toLine (parseFileContent content)
  part1 vents -- solve part 1
  part2 vents -- solve part 2
  hClose handle

part1 :: [Line] -> IO ()
part1 vents = do
  let horVents = filter (straight y) vents
  let vertVents = filter (straight x) vents
  let allPoints = linesToPoints pointsBetween horVents ++ linesToPoints pointsBetween vertVents
  let repeatedPoints = repeated allPoints
  print (length repeatedPoints)

part2 :: [Line] -> IO ()
part2 vents = do
  let allPoints = linesToPoints pointsBetween vents
  let repeatedPoints = repeated allPoints
  print (length repeatedPoints)

parseFileContent :: String -> [[[Int]]]
parseFileContent content = map (map (map toInt . splitOn ",") . splitOn " -> ") (lines content)

toInt :: String -> Int
toInt n = read n :: Int

linesToPoints :: (Point -> Point -> [Point]) -> [Line] -> [Point]
linesToPoints pointsBetween = foldl (\points line -> points ++ pointsBetween (start line) (stop line)) []

pointsBetween :: Point -> Point -> [Point]
pointsBetween p1 p2 = do
  let steps = max (abs (x p2 - x p1)) (abs (y p2 - y p1)) -- as it is allways 45 degrees, this should be fine
  let dx = dvalue x p1 p2
  let dy = dvalue y p1 p2
  map (\s -> Point {x = x p1 + s * dx, y = y p1 + s * dy}) [0 .. steps]

dvalue :: (Point -> Int) -> Point -> Point -> Int
dvalue value p1 p2
  | value p1 < value p2 = 1
  | value p1 > value p2 = -1
  | otherwise = 0

toLine :: [[Int]] -> Line
toLine n = Line {start = toPoint (head n), stop = toPoint (last n)}

toPoint :: [Int] -> Point
toPoint l = Point {x = head l, y = last l}

straight :: (Point -> Int) -> Line -> Bool
straight value l = value (start l) == value (stop l)

makeField :: Int -> Int -> [[Int]]
makeField x y = replicate y (replicate x 0)