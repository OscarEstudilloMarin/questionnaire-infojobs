export const parseLabel = (label: string) => {
    // make a function that takes a string in cammel case and returns a string with spaces
    const spaceAddedLabel = label.replace(/([a-z])([A-Z])/g, '$1 $2')
    return spaceAddedLabel.charAt(0).toUpperCase() + spaceAddedLabel.slice(1)
}
