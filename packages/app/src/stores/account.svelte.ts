class Counter {
    private count = $state(0);

    get() {
        return this.count;
    }

    set(newCount: number) {
        this.count = newCount;
    }
}

export const counter = new Counter();

