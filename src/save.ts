function saveLevelNumber(n: number)
{
    localStorage.setItem(LOCALSTORAGE_PREFIX + "l", n.toString());
}

function loadLevelNumber()
{
    let n = localStorage.getItem(LOCALSTORAGE_PREFIX + "l");
    return n ? parseInt(n) : FIRST_LEVEL_NUMBER;
}
