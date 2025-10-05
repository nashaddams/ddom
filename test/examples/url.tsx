export function Url() {
  const setParam = () => {
    const url = new URL(globalThis.window.document.URL);
    url.searchParams.set("hello", "there");
    globalThis.window.history.pushState({}, "", url);
  };

  return (
    <button type="button" data-testid="set-param" onClick={setParam}>
      Set param
    </button>
  );
}
