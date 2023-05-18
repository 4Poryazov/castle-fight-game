class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }
    changeSprite(x, y, imageSrc, framesMax, scale = 1) {
        this.position = {
            x: x,
            y: y
        },
            this.image = new Image()
        this.image.src = imageSrc,
            this.framesMax = framesMax,
            this.scale = scale
    }
    draw() {
        context.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width / this.framesMax * this.scale,
            this.image.height * this.scale
        )
    }
    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
    update() {
        this.draw();
        this.animateFrames();
    }
};

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'blue',
        imageSrc,
        scale = 1,
        framesMax,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity;
        this.width = 40;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }
    update() {
        this.draw();
        if (!this.dead) {
            this.animateFrames();
        }

        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // draw Attack Boxes
        // context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        } else {
            this.velocity.y += gravity;
        }
    }
    attackLeft() {
        this.switchSprite('attack1Left');
        this.isAttacking = true;
    }
    attackRight() {
        this.switchSprite('attack1Right');
        this.isAttacking = true;
    }

    secondAttackLeft() {
        this.switchSprite('attack2Left');
        this.isAttacking = true;
    }

    secondAttackRight() {
        this.switchSprite('attack2Right');
        this.isAttacking = true;
    }

    takeHitLeft() {
        this.health -= 10;
        if (this.health <= 0) {
            this.switchSprite('deathLeft');
        } else {
            this.switchSprite('takeHitLeft');
        };
    }

    takeHitRight() {
        this.health -= 10;
        if (this.health <= 0) {
            this.switchSprite('deathRight');
        } else {
            this.switchSprite('takeHitRight');
        };
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.deathLeft.image) {
            if (this.framesCurrent === this.sprites.deathLeft.framesMax - 1) {
                this.dead = true;
            }
            return;
        };
        if (this.image === this.sprites.deathRight.image) {
            if (this.framesCurrent === this.sprites.deathRight.framesMax - 1) {
                this.dead = true;
            }
            return;
        };

        // overriding all other animations with attack1 animation
        if (this.image === this.sprites.attack1Left.image && this.framesCurrent < this.sprites.attack1Left.framesMax - 1) {
            return;
        }
        if (this.image === this.sprites.attack1Right.image && this.framesCurrent < this.sprites.attack1Right.framesMax - 1) {
            return;
        }

        // overriding all other animations with attack2 animation
        if (this.image === this.sprites.attack2Left.image && this.framesCurrent < this.sprites.attack2Left.framesMax - 1) {
            return;
        }
        if (this.image === this.sprites.attack2Right.image && this.framesCurrent < this.sprites.attack2Right.framesMax - 1) {
            return;
        }

        // override when figther gets hit
        if (this.image === this.sprites.takeHitLeft.image && this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1) {
            return;
        }
        if (this.image === this.sprites.takeHitRight.image && this.framesCurrent < this.sprites.takeHitRight.framesMax - 1) {
            return;
        }

        switch (sprite) {
            case 'idleLeft':
                if (this.image !== this.sprites.idleLeft.image) {
                    this.image = this.sprites.idleLeft.image;
                    this.framesMax = this.sprites.idleLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'idleRight':
                if (this.image !== this.sprites.idleRight.image) {
                    this.image = this.sprites.idleRight.image;
                    this.framesMax = this.sprites.idleRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'runLeft':
                if (this.image !== this.sprites.runLeft.image) {
                    this.image = this.sprites.runLeft.image;
                    this.framesMax = this.sprites.runLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'runRight':
                if (this.image !== this.sprites.runRight.image) {
                    this.image = this.sprites.runRight.image;
                    this.framesMax = this.sprites.runRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jumpLeft':
                if (this.image !== this.sprites.jumpLeft.image) {
                    this.image = this.sprites.jumpLeft.image;
                    this.framesMax = this.sprites.jumpLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jumpRight':
                if (this.image !== this.sprites.jumpRight.image) {
                    this.image = this.sprites.jumpRight.image;
                    this.framesMax = this.sprites.jumpRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fallLeft':
                if (this.image !== this.sprites.fallLeft.image) {
                    this.image = this.sprites.fallLeft.image;
                    this.framesMax = this.sprites.fallLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fallRight':
                if (this.image !== this.sprites.fallRight.image) {
                    this.image = this.sprites.fallRight.image;
                    this.framesMax = this.sprites.fallRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1Left':
                if (this.image !== this.sprites.attack1Left.image) {
                    this.image = this.sprites.attack1Left.image;
                    this.framesMax = this.sprites.attack1Left.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1Right':
                if (this.image !== this.sprites.attack1Right.image) {
                    this.image = this.sprites.attack1Right.image;
                    this.framesMax = this.sprites.attack1Right.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack2Left':
                if (this.image !== this.sprites.attack2Left.image) {
                    this.image = this.sprites.attack2Left.image;
                    this.framesMax = this.sprites.attack2Left.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack2Right':
                if (this.image !== this.sprites.attack2Right.image) {
                    this.image = this.sprites.attack2Right.image;
                    this.framesMax = this.sprites.attack2Right.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHitLeft':
                if (this.image !== this.sprites.takeHitLeft.image) {
                    this.image = this.sprites.takeHitLeft.image;
                    this.framesMax = this.sprites.takeHitLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHitRight':
                if (this.image !== this.sprites.takeHitRight.image) {
                    this.image = this.sprites.takeHitRight.image;
                    this.framesMax = this.sprites.takeHitRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'deathLeft':
                if (this.image !== this.sprites.deathLeft.image) {
                    this.image = this.sprites.deathLeft.image;
                    this.framesMax = this.sprites.deathLeft.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'deathRight':
                if (this.image !== this.sprites.deathRight.image) {
                    this.image = this.sprites.deathRight.image;
                    this.framesMax = this.sprites.deathRight.framesMax;
                    this.framesCurrent = 0;
                }
                break;
        }
    }

}